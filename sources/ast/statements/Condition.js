var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Condition", function (node) {

  // Basic checks
  if (node.ast_type != "Condition") {
    throw new Ast.NodeTypeError(node, "Condition");
  }

  // Childs check
  var node_if = node.ast_childs.If;
  if (!node_if) {
    throw new Ast.NodeMissingChild(node, "If");
  }
  var node_else_ifs = node.ast_childs.ElseIfs;
  var node_else = node.ast_childs.Else;

  // Node logic
  node.if = {
    expression: new Ast.node("Expression", node_if.ast_childs.Expression),
    block: new Ast.node("Block", node_if.ast_childs.Block),
  };

  node.else_ifs = [];
  utils._.each(node_else_ifs, function (else_if) {
    node.else_ifs.push({
      expression: new Ast.node("Expression", else_if.ast_childs.Expression),
      block: new Ast.node("Block", else_if.ast_childs.Block),
    });
  });

  node.else = undefined;
  if (node_else) {
    node.else = {
      block: new Ast.node("Block", node_else.ast_childs.Block),
    };
  }

  // Check async
  node.isAsync = false;
  if (node.if.expression.isAsync) {
    node.isAsync = true;
  }
  if (node.if.block.isAsync) {
    node.isAsync = true;
  }
  utils._.each(node.else_ifs, function (else_if) {
    if (else_if.expression.isAsync) {
      node.isAsync = true;
    }
    if (else_if.block.isAsync) {
      node.isAsync = true;
    }
  });
  if (node.else) {
    if (node.else.block.isAsync) {
      node.isAsync = true;
    }
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var checks = [];
      checks.push(node.if);
      utils._.each(node.else_ifs, function (else_if) {
        checks.push(else_if);
      });
      if (node.else) {
        checks.push(node.else);
      }
      var calls = [];
      utils._.each(calls, function (call) {
        var exp = "undefined";
        if (call.expression) {
          exp = call.expression.exportAsFunction(_context);
        }
        var blk = call.block.exportAsFunction(_context);
        calls.push("[" + exp + "," + blk + "]");
      });
      var str;
      str += "function (next) {\n";
      str += "_tjs._condition([\n";
      str += calls.join(",\n");
      str += "], next);\n";
      str += "}\n";
      return str;
    }
    else {
      var str = "";
      str += "if (" + node.if.expression.export(_context) + ") {\n";
      str += node.if.block.export(_context);
      str += "}";
      utils._.each(node.else_ifs, function (else_if) {
        str += "\nelse if (" + else_if.expression.export(_context) + ") {\n";
        str += else_if.block.export(_context);
        str += "}";
      });
      if (node.else) {
        str += "\nelse {\n";
        str += node.else.block.export(_context);
        str += "}";
      }
      return str;
    }
  };

});

var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Block", function (node) {

  // Basic checks
  if (node.ast_type != "Block") {
    throw new Ast.NodeTypeError(node, "Block");
  }

  // Node logic
  node.statements = [];
  utils._.each(node.ast_childs, function (statement) {
    node.statements.push(new Ast.node("Statement", statement));
  });

  // Check async
  node.isAsync = false;
  utils._.each(node.statements, function (statement) {
    if (statement.isAsync) {
      node.isAsync = true;
    }
  });

  // Node compile
  node.compile = function (context) {
    var _context = utils.context.clone(context);
    utils._.each(node.statements, function (statement) {
      //statement.compile(_context);
    });
    return node;
  };

  // Node export
  node.exportAsFunction = function (context) {
    var str = node.export(context);
    if (node.isAsync) {
      return str;
    }
    else {
      var f = "";
      f += "function (next) {\n";
      f += str;
      f += "next()\n";
      f += "}\n";
      return f;
    }
  };
  node.export = function (context) {
    var _context = utils.context.clone(context);
    // Async block
    if (node.isAsync) {
      var calls = [];
      utils._.each(node.statements, function (statement) {
        if (statement.isAsync) {
          calls.push(statement.export(_context));
        }
        else {
          var st = "function (next) {";
          st += statement.export(_context) + ";\n";
          st += "next()";
          st += "}";
          calls.push(st);
        }
      });
      var result = "";
      result += "function (next) {\n";
      result += "_tjs._async._block([\n";
      result += calls.join(",");
      result += "], next);\n";
      result += "}\n";
      return result;
    }
    // Sync block
    else {
      var result = "";
      utils._.each(node.statements, function (statement) {
        result += statement.export(_context) + ";\n";
      });
      return result;
    }
  };

});

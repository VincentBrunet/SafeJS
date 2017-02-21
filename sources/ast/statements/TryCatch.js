var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("TryCatch", function (node) {

  // Basic checks
  if (node.ast_type != "TryCatch") {
    throw new Ast.NodeTypeError(node, "TryCatch");
  }

  // Childs check
  var node_finally_block = node.ast_childs.FinallyBlock;
  var node_catches = node.ast_childs.Catches;
  var node_try_block = node.ast_childs.TryBlock;
  if (!node_try_block) {
    throw new Ast.NodeMissingChild(node, "TryBlock");
  }

  node.try = new Ast.node("Block", node_try_block);
  node.finally = undefined;
  if (node_finally_block) {
    node.finally = new Ast.node("Block", node_finally_block);
  }

  node.catches = [];
  utils._.each(node_catches, function (node_catch) {
    node.catches.push({
      identifier: new Ast.node("Identifier", node_catch.ast_childs.Identifier),
      type: new Ast.node("Type", node_catch.ast_childs.Type || Ast.predefined("Type:Generic")),
      block: new Ast.node("Block", node_catch.ast_childs.Block),
    });
  });

  node.isAsync = false;
  if (node.try.isAsync) {
    node.isAsync = true;
  }
  if (node.finally && node.finally.isAsync) {
    node.isAsync = true;
  }
  utils._.each(node.catches, function (_catch) {
    if (_catch.isAsync) {
      node.isAsync = true;
    }
  });
 
  node.export = function (context) {
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var result = "";
      result += "function (next) {\n";
      result += "_tjs._try(\n";
      result += node.try.exportAsFunction(_context) + ",";
      if (node.finally) {
        result += node.finally.exportAsFunction(_context) + ",";
      } else {
        result += "undefined,";
      }
      var catches = [];
      utils._.each(node.catches, function (_catch) {
        var cc = "";
        cc += "function (" + _catch.identifier.name + ") {\n";
        cc += "return " + _catch.block.exportAsFunction(_context) + ";\n";
        cc += "}\n";
        catches.push(cc);
      });
      result += "[" + catches.join(",") + "]";
      result += ", next);\n";
      result += "}\n";
      return result;
    }
    else {
      var str = "";
      str += "try {\n"
      str += node.try.export(_context);
      str += "}\n";
      utils._.each(node.catches, function (_catch) {
        str += "catch ";
        str += "(" + _catch.identifier.name + ")";
        str += "{\n";
        str += _catch.block.export(_context);
        str += "}\n";
      });
      if (node.finally) {
        str += "finally {\n";
        str += node.finally.export(_context);
        str += "}\n";
      }
      return str;
    }
  };

});

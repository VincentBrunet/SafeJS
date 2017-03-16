var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Async", function (node) {

  // Basic checks
  if (node.ast_type != "Async") {
    throw new Ast.NodeTypeError(node, "Async");
  }

  // Childs check
  var node_type = node.ast_childs.Type;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw new Ast.NodeMissingChild(node, "Block");
  }

  // Node logic
  node.type = new Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.block = new Ast.node("Block", node_block);

  // Check async
  node.isAsyncOnCall = false;
  if (node.block.isAsync) {
    node.isAsyncOnCall = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var str = "";
    str += "function()";
    str += "{";
    str += node.block.export(_context);
    str += "}";
    return str;
  };

});

var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Async", function (node) {
  // Childs check
  var node_type = node.ast_childs.Type;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node logic
  node.type = Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

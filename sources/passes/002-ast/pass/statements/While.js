var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("While", function (node) {
  // Child checks
  var node_condition = node.ast_childs.Condition;
  if (!node_condition) {
    throw Ast.error("NodeMissingChild", "Condition");
  }
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node
  node.condition = Ast.node("Expression", node_condition);
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

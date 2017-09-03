var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("For", function (node) {
  // Child checks
  var node_expression = node.ast_childs.Expression;
  if (!node_expression) {
    throw Ast.error("NodeMissingChild", "Expression");
  }
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node
  //node.identifier = Ast.node("Identitifier", node_condition);
  node.expression = Ast.node("Expression", node_condition);
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

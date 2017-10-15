var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Repeat", function (node) {
  // Child checks
  var node_iterations = node.ast_childs.Iterations;
  if (!node_iterations) {
    throw Ast.error("NodeMissingChild", "Iterations");
  }
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node
  node.iterations = Ast.node("Expression", node_iterations);
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

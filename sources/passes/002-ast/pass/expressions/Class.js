var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Class", function (node) {
  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  // var node_params = node.ast_childs.Params;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node logic
  node.name = undefined;
  if (node_name) {
    node.name = (Ast.node("Identifier", node_name)).name;
  }
  node.type = Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  // node.params = Ast.node("FunctionParams", node_params || Ast.predefined("FunctionParams:Empty"));
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

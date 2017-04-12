var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("TryCatch", function (node) {
  // Childs check
  var node_finally_block = node.ast_childs.FinallyBlock;
  var node_catches = node.ast_childs.Catches;
  var node_try_block = node.ast_childs.TryBlock;
  if (!node_try_block) {
    throw Ast.error("NodeMissingChild", "TryBlock");
  }
  node.try = Ast.node("Block", node_try_block);
  node.finally = undefined;
  if (node_finally_block) {
    node.finally = Ast.node("Block", node_finally_block);
  }
  node.catches = [];
  utils._.each(node_catches, function (node_catch) {
    node.catches.push({
      identifier: Ast.node("Identifier", node_catch.ast_childs.Identifier),
      type: Ast.node("Type", node_catch.ast_childs.Type || Ast.predefined("Type:Generic")),
      block: Ast.node("Block", node_catch.ast_childs.Block),
    });
  });
  // Done
  return node;
});

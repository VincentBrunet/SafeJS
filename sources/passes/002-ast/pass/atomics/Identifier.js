var utils = require("../../../../utils");
var Ast = require("../Ast");

// Identifier from AST
Ast.register("Identifier", function (node) {
  // Datas check
  if (!node.ast_datas.value) {
    throw Ast.error("NodeMissingData", "value");
  }
  // Node logic
  node.name = node.ast_datas.value;
  node.value = node.ast_datas.value;
  // Done
  return node;
});

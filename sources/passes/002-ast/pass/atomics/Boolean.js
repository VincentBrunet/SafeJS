var utils = require("../../../../utils");
var Ast = require("../Ast");

// Boolean AST node
Ast.register("Boolean", function (node) {
  // Datas check
  if (node.ast_datas.value === undefined) {
    throw Ast.error("NodeMissingData", "value");
  }
  // Node logic
  node.value = node.ast_datas.value;
  // Done
  return node;
});

Ast.predefine("Boolean", function (value) {
  return {
    ast_type: "Boolean",
    ast_datas: {
      value: value,
    },
  };
});

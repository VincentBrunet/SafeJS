var utils = require("../../../../utils");
var Ast = require("../Ast");

// String in AST
Ast.register("String", function (node) {
  // Datas check
  if (node.ast_datas.value === undefined) {
    throw Ast.error("NodeMissingData", "value");
  }
  // Node logic
  node.value = node.ast_datas.value;
  // Done
  return node;
});

Ast.predefine("String", function (value) {
  return {
    ast_type: "String",
    ast_datas: {
      value: value,
    },
  };
});

var utils = require("../../../../utils");
var Ast = require("../Ast");

// Number in AST
Ast.register("Number", function (node) {
  // Datas check
  if (node.ast_datas.value === undefined) {
    throw Ast.error("NodeMissingData", "value");
  }
  // Node logic
  node.value = node.ast_datas.value;
  // Done
  return node;
});

Ast.predefine("Number", function (value) {
  return {
    ast_type: "Number",
    ast_datas: {
      value: value,
    },
  };
});

var utils = require("../../../../utils");
var Ast = require("../Ast");

// Null in AST
Ast.register("Null", function (node) {
  // Done
  return node;
});

Ast.predefine("Null", function () {
  return {
    ast_type: "Null",
  };
});

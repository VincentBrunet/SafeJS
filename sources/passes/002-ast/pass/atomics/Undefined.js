var utils = require("../../../../utils");
var Ast = require("../Ast");

// Undefined in AST
Ast.register("Undefined", function (node) {
  // Done
  return node;
});

Ast.predefine("Undefined", function () {
  return {
    ast_type: "Undefined",
  };
});

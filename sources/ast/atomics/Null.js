var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Null", function (node) {

  // Basic checks
  if (node.ast_type != "Null") {
    throw new Ast.NodeTypeError(node, "Null");
  }

  // Node export
  node.export = function () {
    return "null";
  };

});

Ast.predefine("Null", function () {
  return {
    ast_type: "Null",
  };
});

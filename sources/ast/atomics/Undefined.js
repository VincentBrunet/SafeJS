var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Undefined", function (node) {

  // Basic checks
  if (node.ast_type != "Undefined") {
    throw new Ast.NodeTypeError(node, "Undefined");
  }

  // Node export
  node.export = function () {
    return "undefined";
  };

});

Ast.predefine("Undefined", function () {
  return {
    ast_type: "Undefined",
  };
});

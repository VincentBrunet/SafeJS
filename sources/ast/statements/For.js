var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("For", function (node) {

  // Basic checks
  if (node.ast_type != "For") {
    throw new Ast.NodeTypeError(node, "For");
  }

  node.export = function () {
    return "[For]";
  };

});

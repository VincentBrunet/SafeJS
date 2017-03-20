var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Continue", function (node) {

  // Basic checks
  if (node.ast_type != "Continue") {
    throw new Ast.NodeTypeError(node, "Continue");
  }

  // Check async
  node.isAsync = false;

  // Node export
  node.export = function (context) {
    return "continue";
  };

});

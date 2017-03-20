var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Break", function (node) {

  // Basic checks
  if (node.ast_type != "Break") {
    throw new Ast.NodeTypeError(node, "Break");
  }

  // Check async
  node.isAsync = false;

  // Node export
  node.export = function (context) {
    return "break";
  };

});

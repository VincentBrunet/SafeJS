var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Return", function (node) {

  // Basic checks
  if (node.ast_type != "Return") {
    throw new Ast.NodeTypeError(node, "Return");
  }

  // Childs check
  var node_value = node.ast_childs.Expression;
  node.value = new Ast.node("Expression", node_value || Ast.predefined("Expression:Undefined"));

  // Node export
  node.export = function () {
    return "return " + node.value.export();
  };

});

var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Throw", function (node) {
  // Childs check
  var node_value = node.ast_childs.Expression;
  node.value = Ast.node("Expression", node_value || Ast.predefined("Expression:Undefined"));
  // Done
  return node;
});

var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Operation", function (node) {
  // Childs check
  var node_e1 = node.ast_childs.E1;
  var node_e2 = node.ast_childs.E2;
  if (!node_e1) {
    throw Ast.error("NodeMissingChild", "Expression(1)");
  }
  // Datas check
  if (!node.ast_datas.op) {
    throw Ast.error("NodeMissingData", "op");
  }
  node.op = node.ast_datas.op;
  // Node logic
  node.e1 = Ast.node("Expression", Ast.predefined("Expression", node_e1));
  node.e2 = undefined;
  if (node_e2) {
    node.e2 = Ast.node("Expression", Ast.predefined("Expression", node_e2));
  }
  // Done
  return node;
});

var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Condition", function (node) {
  // Childs check
  var node_if = node.ast_childs.If;
  if (!node_if) {
    throw Ast.error("NodeMissingChild", "If");
  }
  var node_else_ifs = node.ast_childs.ElseIfs;
  var node_else = node.ast_childs.Else;
  // Node logic
  node.if = {
    expression: Ast.node("Expression", node_if.ast_childs.Expression),
    block: Ast.node("Block", node_if.ast_childs.Block),
  };
  node.else_ifs = [];
  utils._.each(node_else_ifs, function (else_if) {
    node.else_ifs.push({
      expression: Ast.node("Expression", else_if.ast_childs.Expression),
      block: Ast.node("Block", else_if.ast_childs.Block),
    });
  });
  node.else = undefined;
  if (node_else) {
    node.else = {
      block: Ast.node("Block", node_else.ast_childs.Block),
    };
  }
  // Done
  return node;
});

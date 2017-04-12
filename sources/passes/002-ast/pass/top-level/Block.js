var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Block", function (node) {
  // Node logic
  node.statements = [];
  utils._.each(node.ast_childs, function (statement) {
    node.statements.push(Ast.node("Statement", statement));
  });
  // Done
  return node;
});

var utils = require("../../../../utils");
var Ast = require("../Ast");

// Javascript array AST
Ast.register("Array", function (node) {
  // Node logic
  node.elements = [];
  utils._.each(node.ast_childs, function (expression, idx) {
    node.elements.push(Ast.node("Expression", expression));
  });
  // Done
  return node;
});

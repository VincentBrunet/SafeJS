var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Tuple", function (node) {
  // Node logic
  node.elements = [];
  utils._.each(node.ast_childs, function (expression, idx) {
    node.elements.push(Ast.node("Expression", expression));
  });
  // Done
  return node;
});

Ast.predefine("Tuple", function (array) {
  return {
    ast_type: "Tuple",
    ast_childs: array,
  };
});

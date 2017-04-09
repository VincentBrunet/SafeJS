var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Dict", function (node) {
  // Node logic
  node.elements = [];
  utils._.each(node.ast_childs, function (expression, idx) {
    //node.elements.push(Ast.node("Expression", expression));
  });
  // Done
  return node;
});

Ast.predefine("Dict", function (dict) {
  return {
    ast_type: "Dict",
    ast_childs: dict,
  };
});

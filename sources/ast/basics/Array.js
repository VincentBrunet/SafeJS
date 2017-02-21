var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Array", function (node) {

  // Basic checks
  if (node.ast_type != "Array") {
    throw new Ast.NodeTypeError(node, "Array");
  }

  // Node logic
  node.elements = [];
  utils._.each(node.ast_childs, function (expression, idx) {
    node.elements.push(new Ast.node("Expression", expression));
  });

  // Check async
  node.isAsync = false;
  utils._.each(node.elements, function (element) {
    if (element.isAsync) {
      node.isAsync = true;
    }
  });

  // Node export
  node.export = function (context) {
    var context = utils.context.clone(context);
    var els = [];
    utils._.each(node.elements, function (element) {
      els.push(element.export(_context));
    });
    return "[" + els.join(", ") + "]";
  };

});

Ast.predefine("Array", function (array) {
  return {
    ast_type: "Array",
    ast_childs: array,
  };
});

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
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var str = "";
      str += "function(___n){";
      str += "_tjs._async._array([";
      var els = [];
      utils._.each(node.elements, function (element) {
        els.push(element.exportAsFunction(_context));
      });
      str += els.join(",");
      str += "],___n);";
      str += "}";
      return str;
    }
    else {
      var els = [];
      utils._.each(node.elements, function (element) {
        els.push(element.export(_context));
      });
      return "[" + els.join(",") + "]";
    }
  };

});

Ast.predefine("Array", function (array) {
  return {
    ast_type: "Array",
    ast_childs: array,
  };
});

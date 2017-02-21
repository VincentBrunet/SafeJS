var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Dict", function (node) {

  // Basic checks
  if (node.ast_type != "Dict") {
    throw new Ast.NodeTypeError(node, "Dict");
  }

  // Node logic
  node.elements = [];
  utils._.each(node.ast_childs, function (expression, idx) {
    //node.elements.push(new Ast.node("Expression", expression));
  });

  // Check async
  node.isAsync = false;
  utils._.each(node.elements, function (element) {
    // if (element.isAsync) {
    //   node.isAsync = true;
    // }
  });

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    return "{ /* NOT IMPLEMENTED */}";
    var els = [];
    utils._.each(node.elements, function (element) {
      els.push(element.export(_context));
    });
    return "{" + els.join(", ") + "}";
  };

});

Ast.predefine("Dict", function (dict) {
  return {
    ast_type: "Dict",
    ast_childs: dict,
  };
});

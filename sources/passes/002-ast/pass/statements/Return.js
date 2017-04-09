var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Return", function (node) {

  // Basic checks
  if (node.ast_type != "Return") {
    throw new Ast.NodeTypeError(node, "Return");
  }

  // Childs check
  var node_value = node.ast_childs.Expression;
  node.value = new Ast.node("Expression", node_value || Ast.predefined("Expression:Undefined"));

  // Check async
  node.isAsync = false;
  if (node.value.isAsync) {
    node.isAsync = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    return "return " + node.value.export(_context);
  };

});

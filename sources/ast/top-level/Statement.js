var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Statement", function (node) {

  // Basic checks
  if (node.ast_type != "Statement") {
    throw new Ast.NodeTypeError(node, "Statement");
  }

  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw new Ast.NodeMissingChild(node, "Content");
  }

  // Node logic
  node.content = undefined;
  if (node_content.ast_type == "Variable") {
    node.content = new Ast.node("Variable", node_content);
  }
  else if (node_content.ast_type == "Expression") {
    node.content = new Ast.node("Expression", node_content);
  }
  else if (node_content.ast_type == "Return") {
    node.content = new Ast.node("Return", node_content);
  }
  else {
    throw new Ast.NodeUnexpectedType(node_content, [
      "Variable",
      "Return",
      "Expression",
    ]);
  }

  // Node export
  node.export = function () {
    return "" + node.content.export() + ";\n";
  };

});

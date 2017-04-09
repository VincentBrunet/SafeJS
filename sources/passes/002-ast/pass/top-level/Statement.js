var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Statement", function (node) {

  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw new Ast.error("NodeMissingChild", "Content");
  }

  // Node logic
  node.content = undefined;
  if (node_content.ast_type == "Variable") {
    node.content = new Ast.node("Variable", node_content);
    node.isVariable = true;
  }
  else if (node_content.ast_type == "Return") {
    node.content = new Ast.node("Return", node_content);
    node.isReturn = true;
  }
  else if (node_content.ast_type == "Resolve") {
    node.content = new Ast.node("Resolve", node_content);
    node.isResolve = true;
  }
  else if (node_content.ast_type == "Throw") {
    node.content = new Ast.node("Throw", node_content);
    node.isThrow = true;
  }
  else if (node_content.ast_type == "Expression") {
    node.content = new Ast.node("Expression", node_content);
  }
  else if (node_content.ast_type == "Condition") {
    node.content = new Ast.node("Condition", node_content);
  }
  else if (node_content.ast_type == "TryCatch") {
    node.content = new Ast.node("TryCatch", node_content);
  }
  else if (node_content.ast_type == "For") {
    node.content = new Ast.node("For", node_content);
  }
  else if (node_content.ast_type == "While") {
    node.content = new Ast.node("While", node_content);
  }
  else {
    throw new Ast.error("NodeUnexpectedType", node_content, [
      "Variable",
      "Return",
      "Resolve",
      "Throw",
      "Expression",
      "Condition",
      "TryCatch",
      "For",
      "While",
    ]);
  }

  // Check async
  node.isAsync = false;
  if (node.content.isAsync) {
    node.isAsync = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    return node.content.export(_context);
  };

});

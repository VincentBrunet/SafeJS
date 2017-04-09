var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Expression", function (node) {
  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw Ast.error("NodeMissingChild", "Content");
  }
  // Node logic
  node.content = undefined;
  if (node_content.ast_type == "Litteral") {
    node.content = Ast.node("Litteral", node_content);
  }
  else if (node_content.ast_type == "Function") {
    node.content = Ast.node("Function", node_content);
  }
  else if (node_content.ast_type == "Async") {
    node.content = Ast.node("Async", node_content);
  }
  else if (node_content.ast_type == "Class") {
    node.content = Ast.node("Class", node_content);
  }
  else if (node_content.ast_type == "Operation") {
    node.content = Ast.node("Operation", node_content);
  }
  else if (node_content.ast_type == "Identifier") {
    node.content = Ast.node("Identifier", node_content);
  }
  else {
    throw Ast.error("NodeUnexpectedType", node_content, [
      "Class",
      "Litteral",
      "Function",
      "Async",
      "Operation",
      "Identifier",
    ]);
  }
  // Done
  return node;
});


Ast.predefine("Expression", function (content) {
  if (!content) {
    return undefined;
  }
  if (content.ast_type == "Expression") {
    return content;
  }
  return {
    ast_type: "Expression",
    ast_childs: {
      Content: content,
    },
  };
});


Ast.predefine("Expression:Undefined", function () {
  var nundefined = Ast.predefined("Litteral", Ast.predefined("Undefined"))
  return Ast.predefined("Expression", nundefined);
});


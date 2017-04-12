var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Litteral", function (node) {
  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw Ast.error("NodeMissingChild", "Content");
  }
  // Node logic
  node.content = undefined;
  if (node_content.ast_type == "Number") {
    node.content = Ast.node("Number", node_content);
  }
  else if (node_content.ast_type == "String") {
    node.content = Ast.node("String", node_content);
  }
  else if (node_content.ast_type == "Undefined") {
    node.content = Ast.node("Undefined", node_content);
  }
  else if (node_content.ast_type == "Null") {
    node.content = Ast.node("Null", node_content);
  }
  else if (node_content.ast_type == "Tuple") {
    node.content = Ast.node("Tuple", node_content);
  }
  else if (node_content.ast_type == "Array") {
    node.content = Ast.node("Array", node_content);
  }
  else if (node_content.ast_type == "Dict") {
    node.content = Ast.node("Dict", node_content);
  }
  else if (node_content.ast_type == "Boolean") {
    node.content = Ast.node("Boolean", node_content);
  }
  else {
    throw Ast.error("NodeUnexpectedType", node_content, [
      "Number",
      "String",
      "Undefined",
      "Null",
      "Tuple",
      "Array",
      "Dict",
      "Boolean",
    ]);
  }
  // Done
  return node;
});

Ast.predefine("Litteral", function (content) {
  return {
    ast_type: "Litteral",
    ast_childs: {
      Content: content,
    },
  };
});

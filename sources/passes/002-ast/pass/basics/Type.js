var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Type", function (node) {
  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw Ast.error("NodeMissingChild", "Content");
  }
  // Node logic
  /*
  node.content = undefined;
  if (node_content.ast_type == "Number") {
    node.content = new Ast.node("Number", node_content);
  }
  else if (node_content.ast_type == "String") {
    node.content = new Ast.node("String", node_content);
  }
  else if (node_content.ast_type == "Undefined") {
    node.content = new Ast.node("Undefined", node_content);
  }
  else if (node_content.ast_type == "Null") {
    node.content = new Ast.node("Null", node_content);
  }
  else {
    throw new Ast.NodeUnexpectedType(node_content, [
      "Number",
      "String",
      "Undefined",
      "Null",
    ]);
  }
  */
  // Done
  return node;
});

Ast.predefine("Type:Generic", function (content) {
  return {
    ast_type: "Type",
    ast_childs: {
      Content: {},
    },
  };
});

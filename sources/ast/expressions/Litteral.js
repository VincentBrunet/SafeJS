var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Litteral", function (node) {

  // Basic checks
  if (node.ast_type != "Litteral") {
    throw new Ast.NodeTypeError(node, "Litteral");
  }

  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw new Ast.NodeMissingChild(node, "Content");
  }

  // Node logic
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

  // Node export
  node.export = function () {
    return node.content.export();
  };

});

Ast.predefine("Litteral", function (content) {
  return {
    ast_type: "Litteral",
    ast_childs: {
      Content: content,
    },
  };
});

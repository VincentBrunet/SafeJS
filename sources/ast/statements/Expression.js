var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Expression", function (node) {

  // Basic checks
  if (node.ast_type != "Expression") {
    throw new Ast.NodeTypeError(node, "Expression");
  }

  // Childs check
  var node_content = node.ast_childs.Content;
  if (!node_content) {
    throw new Ast.NodeMissingChild(node, "Content");
  }

  // Node logic
  node.content = undefined;
  if (node_content.ast_type == "Litteral") {
    node.content = new Ast.node("Litteral", node_content);
  }
  else if (node_content.ast_type == "Function") {
    node.content = new Ast.node("Function", node_content);
  }
  else {
    throw new Ast.NodeUnexpectedType(node_content, [
      "Litteral",
      "Function",
    ]);
  }

  // Node export
  node.export = function () {
    return node.content.export();
  };

});

Ast.predefine("Expression:Undefined", function () {
  return {
    ast_type: "Expression",
    ast_childs: {
      Content: Ast.predefined("Litteral", Ast.predefined("Undefined")),
    },
  };
});

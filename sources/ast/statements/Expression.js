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
  else if (node_content.ast_type == "Async") {
    node.content = new Ast.node("Async", node_content);
  }
  else if (node_content.ast_type == "Class") {
    node.content = new Ast.node("Class", node_content);
  }
  else if (node_content.ast_type == "Operation") {
    node.content = new Ast.node("Operation", node_content);
  }
  else if (node_content.ast_type == "Identifier") {
    node.content = new Ast.node("Identifier", node_content);
  }
  else {
    throw new Ast.NodeUnexpectedType(node_content, [
      "Class",
      "Litteral",
      "Function",
      "Async",
      "Operation",
      "Identifier",
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


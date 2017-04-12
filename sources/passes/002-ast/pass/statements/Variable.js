var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Variable", function (node) {
  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  var node_value = node.ast_childs.Value;
  if (!node_name) {
    throw Ast.error("NodeMissingChild", "Name");
  }
  var node_mode = node.ast_datas.mode;
  // Node logic
  node.readonly = false;
  if (node_mode == "let") {
    node.readonly = true;
  }
  node.name = (Ast.node("Identifier", node_name)).name;
  node.type = Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.value = Ast.node("Expression", node_value || Ast.predefined("Expression:Undefined"));
  // Done
  return node;
});

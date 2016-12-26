var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Variable", function (node) {

  // Basic checks
  if (node.ast_type != "Variable") {
    throw new Ast.NodeTypeError(node, "Variable");
  }

  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  var node_value = node.ast_childs.Value;
  if (!node_name) {
    throw new Ast.NodeMissingChild(node, "Name");
  }
  var node_mode = node.ast_datas.mode;

  // Node logic
  node.readonly = false;
  if (node_mode == "let") {
    node.readonly = true;
  }
  node.name = (new Ast.node("Identifier", node_name)).name;
  node.type = new Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.value = new Ast.node("Expression", node_value || Ast.predefined("Expression:Undefined"));

  // Node export
  node.export = function () {
    var str = "";
    str += "var ";
    str += node.name;
    str += " = ";
    str += node.value.export();
    if (node.readonly) {
      str += " // READ ONLY";
    }
    return str;
  };

});

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

  // Check async
  node.isAsync = false;
  if (node.value.isAsync) {
    node.isAsync = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var str = "";
      str += "function(___n){";
      str += "_tjs._async._assign(";
      str += node.value.exportAsFunction(_context);
      str += ",";
      str += "function(v){";
      str += node.name + "=v";
      str += "}";
      str += ",___n)";
      str += "}";
      return str;
    }
    else {
      var str = "";
      // str += "var ";
      str += node.name;
      str += "=";
      str += node.value.export(_context);
      // if (node.readonly) {
      //   str += " // READ ONLY";
      // }
      return str;
    }
  };

});

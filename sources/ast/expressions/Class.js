var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Class", function (node) {

  // Basic checks
  if (node.ast_type != "Class") {
    throw new Ast.NodeTypeError(node, "Class");
  }

  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  // var node_params = node.ast_childs.Params;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw new Ast.NodeMissingChild(node, "Block");
  }

  // Node logic
  node.name = undefined;
  if (node_name) {
    node.name = (new Ast.node("Identifier", node_name)).name;
  }
  node.type = new Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  // node.params = new Ast.node("FunctionParams", node_params || Ast.predefined("FunctionParams:Empty"));
  node.block = new Ast.node("Block", node_block);

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var str = "";
    str += "class ";
    if (node_name) {
      str += node.name;
    } else {
      str += "/* ANONYMOUS */";
    }
    // str += " " + node.params.export(_context);
    str += " {";
    str += "\n";
    str += node.block.export(_context);
    str += "}";
    return str;
  };

});


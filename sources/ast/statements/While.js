var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("While", function (node) {

  // Basic checks
  if (node.ast_type != "While") {
    throw new Ast.NodeTypeError(node, "While");
  }

  // Child checks
  var node_condition = node.ast_childs.Condition;
  if (!node_condition) {
    throw new Ast.NodeMissingChild(node, "Condition");
  }
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw new Ast.NodeMissingChild(node, "Block");
  }

  // Node
  node.condition = new Ast.node("Expression", node_condition);
  node.block = new Ast.node("Block", node_block);

  // Check async
  node.isAsync = false;
  if (node.condition.isAsync) {
    node.isAsync = true;
  }
  if (node.block.isAsync) {
    node.isAsync = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var str = "";
    str += "while (" + node.condition.export(_context) + ") {";
    str += "\n";
    str += node.block.export(_context);
    str += "}";
    return str;
  };

});

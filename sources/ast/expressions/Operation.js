var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Operation", function (node) {

  // Basic checks
  if (node.ast_type != "Operation") {
    throw new Ast.NodeTypeError(node, "Operation");
  }

  // Childs check
  var node_e1 = node.ast_childs.E1;
  var node_e2 = node.ast_childs.E2;
  if (!node_e1) {
    throw new Ast.NodeMissingChild(node, "Expression(1)");
  }

  // Datas check
  if (!node.ast_datas.op) {
    throw new Ast.NodeMissingData(node, "op");
  }
  node.op = node.ast_datas.op;

  // Node logic
  node.e1 = new Ast.node("Expression", Ast.predefined("Expression", node_e1));
  node.e2 = undefined;
  if (node_e2) {
    node.e2 = new Ast.node("Expression", Ast.predefined("Expression", node_e2));
  }

  // Check async
  node.isAsync = false;
  if (node.e1.isAsync) {
    node.isAsync = true;
  }
  if (node.e2) {
    if (node.e2.isAsync) {
      node.isAsync = true;
    }
  }
  if (node.op == "@") {
    node.isAsync = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    if (node.isAsync) {
      var str = "";
      str += "function (next) {\n";
      str += "_tjs._async._op(\n";
      str += "'" + node.op + "',\n";
      str += node.e1.exportAsFunction(_context) + ",\n";
      if (node.e2) {
        str += node.e2.exportAsFunction(_context) + "\n";
      }
      else {
        str += "undefined";
      }
      str += ", next);\n";
      str += "}";
      return str;
    }
    else {
      var str = "";
      str += "_tjs._sync._op("
      str += "'" + node.op + "',";
      str += node.e1.export(_context);
      if (node.e2) {
        str += "," + node.e2.export(_context);
      }
      str += ")";
      return str;
    }
  };

});

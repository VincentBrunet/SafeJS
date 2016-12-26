var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Identifier", function (node) {

  // Basic checks
  if (node.ast_type != "Identifier") {
    throw new Ast.NodeTypeError(node, "Identifier");
  }

  // Datas check
  if (!node.ast_datas.value) {
    throw new Ast.NodeMissingData(node, "value");
  }

  // Node logic
  node.name = node.ast_datas.value;
  node.value = node.ast_datas.value;

  // Node export
  node.export = function () {
    return node.value;
  };

});

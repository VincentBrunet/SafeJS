var utils = require("../../utils");

var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Number", function (node) {

  // Basic checks
  if (node.ast_type != "Number") {
    throw new Ast.NodeTypeError(node, "Number");
  }

  // Datas check
  if (node.ast_datas.value === undefined) {
    throw new Ast.NodeMissingData(node, "value");
  }

  // Node logic
  node.value = node.ast_datas.value;

  // Node export
  node.export = function () {
    return node.value;
  };

});

Ast.predefine("Number", function (value) {
  return {
    ast_type: "Number",
    ast_datas: {
      value: value,
    },
  };
});

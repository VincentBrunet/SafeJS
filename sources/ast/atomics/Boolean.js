var utils = require("../../utils");

var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Boolean", function (node) {

  // Basic checks
  if (node.ast_type != "Boolean") {
    throw new Ast.NodeTypeError(node, "Boolean");
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

Ast.predefine("Boolean", function (value) {
  return {
    ast_type: "Boolean",
    ast_datas: {
      value: value,
    },
  };
});

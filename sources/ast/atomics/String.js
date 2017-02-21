var utils = require("../../utils");

var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("String", function (node) {

  // Basic checks
  if (node.ast_type != "String") {
    throw new Ast.NodeTypeError(node, "String");
  }

  // Datas check
  if (node.ast_datas.value === undefined) {
    throw new Ast.NodeMissingData(node, "value");
  }

  // Node logic
  node.value = node.ast_datas.value;

  // Node export
  node.export = function () {
    return "\"" + node.value + "\"";
  };

});

Ast.predefine("String", function (value) {
  return {
    ast_type: "String",
    ast_datas: {
      value: value,
    },
  };
});

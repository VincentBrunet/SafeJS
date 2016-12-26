var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Block", function (node) {

  // Basic checks
  if (node.ast_type != "Block") {
    throw new Ast.NodeTypeError(node, "Block");
  }

  // Node logic
  node.statements = [];
  utils._.each(node.ast_childs, function (statement, idx) {
    node.statements.push(new Ast.node("Statement", statement));
  });

  // Node export
  node.export = function () {
    var result = "";
    utils._.each(node.statements, function (statement) {
      result += statement.export();
    });
    return result;
  };

});

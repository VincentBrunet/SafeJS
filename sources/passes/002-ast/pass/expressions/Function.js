var utils = require("../../../../utils");
var Ast = require("../Ast");

Ast.register("Function", function (node) {
  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  var node_params = node.ast_childs.Params;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw Ast.error("NodeMissingChild", "Block");
  }
  // Node logic
  node.name = undefined;
  if (node_name) {
    node.name = (Ast.node("Identifier", node_name)).name;
  }
  node.type = Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.params = Ast.node("FunctionParams", node_params || Ast.predefined("FunctionParams:Empty"));
  node.block = Ast.node("Block", node_block);
  // Done
  return node;
});

Ast.register("FunctionParam", function (node) {
  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  if (!node_name) {
    throw Ast.error("NodeMissingChild", "Name");
  }
  // Node logic
  node.name = (Ast.node("Identifier", node_name)).name;
  node.type = Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  // Done
  return node;
});

Ast.register("FunctionParams", function (node) {
  // Node logic
  node.params = [];
  utils._.each(node.ast_childs, function (param, idx) {
    node.params.push(Ast.node("FunctionParam", param));
  });
  // Done
  return node;
});

/*
Ast.predefine("Function", function (content) {
  return {
    ast_type: "Function",
    ast_childs: {
      Content: content,
    },
  };
});
*/

Ast.predefine("FunctionParams:Empty", function () {
  return {
    ast_type: "FunctionParams",
    ast_childs: [],
  };
});
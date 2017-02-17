var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Function", function (node) {

  // Basic checks
  if (node.ast_type != "Function") {
    throw new Ast.NodeTypeError(node, "Function");
  }

  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  var node_params = node.ast_childs.Params;
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
  node.params = new Ast.node("FunctionParams", node_params || Ast.predefined("FunctionParams:Empty"));
  node.block = new Ast.node("Block", node_block);

  // Check async
  node.isAsyncOnCall = false;
  if (node.block.isAsync) {
    node.isAsyncOnCall = true;
  }

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var str = "";
    str += "function ";
    if (node_name) {
      str += node.name;
    } else {
      str += "/* ANONYMOUS */";
    }
    str += " " + node.params.export(_context);
    str += " {";
    str += "\n";
    str += node.block.export(_context);
    str += "}";
    return str;
  };

});

Ast.register("FunctionParam", function (node) {

  // Basic checks
  if (node.ast_type != "FunctionParam") {
    throw new Ast.NodeTypeError(node, "FunctionParam");
  }

  // Childs check
  var node_name = node.ast_childs.Name;
  var node_type = node.ast_childs.Type;
  if (!node_name) {
    throw new Ast.NodeMissingChild(node, "Name");
  }

  // Node logic
  node.name = (new Ast.node("Identifier", node_name)).name;
  node.type = new Ast.node("Type", node_type || Ast.predefined("Type:Generic"));

  // Node export
  node.export = function () {
    var str = "";
    str += node.name;
    return str;
  };

});

Ast.register("FunctionParams", function (node) {

  // Basic checks
  if (node.ast_type != "FunctionParams") {
    throw new Ast.NodeTypeError(node, "FunctionParams");
  }

  // Node logic
  node.params = [];
  utils._.each(node.ast_childs, function (param, idx) {
    node.params.push(new Ast.node("FunctionParam", param));
  });

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    var results = [];
    utils._.each(node.params, function (param) {
      results.push(param.export(_context));
    });
    return "(" + results.join(", ") + ")";
  };

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
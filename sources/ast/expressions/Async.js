var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Async", function (node) {

  // Basic checks
  if (node.ast_type != "Async") {
    throw new Ast.NodeTypeError(node, "Async");
  }

  // Childs check
  var node_type = node.ast_childs.Type;
  var node_params = node.ast_childs.Params;
  var node_block = node.ast_childs.Block;
  if (!node_block) {
    throw new Ast.NodeMissingChild(node, "Block");
  }

  // Node logic
  node.type = new Ast.node("Type", node_type || Ast.predefined("Type:Generic"));
  node.params = new Ast.node("AsyncParams", node_params || Ast.predefined("AsyncParams:Empty"));
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
    str += node.params.export(_context);
    str += " {";
    str += "\n";
    str += node.block.export(_context);
    str += "}";
    return str;
  };

});

Ast.register("AsyncParam", function (node) {

  // Basic checks
  if (node.ast_type != "AsyncParam") {
    throw new Ast.NodeTypeError(node, "AsyncParam");
  }

  // Childs check
  var node_name = node.ast_childs.Name;
  if (!node_name) {
    throw new Ast.NodeMissingChild(node, "Name");
  }

  // Node logic
  node.name = (new Ast.node("Identifier", node_name)).name;

  // Node export
  node.export = function () {
    var str = "";
    str += node.name;
    return str;
  };

});

Ast.register("AsyncParams", function (node) {

  // Basic checks
  if (node.ast_type != "AsyncParams") {
    throw new Ast.NodeTypeError(node, "AsyncParams");
  }

  // Node logic
  node.params = [];
  utils._.each(node.ast_childs, function (param, idx) {
    node.params.push(new Ast.node("AsyncParam", param));
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
Ast.predefine("Async", function (content) {
  return {
    ast_type: "Async",
    ast_childs: {
      Content: content,
    },
  };
});
*/

Ast.predefine("AsyncParams:Empty", function () {
  return {
    ast_type: "AsyncParams",
    ast_childs: [],
  };
});
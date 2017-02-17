var utils = require("../../utils");
var Ast = require("../Ast");

Ast.register("Block", function (node) {

  // Basic checks
  if (node.ast_type != "Block") {
    throw new Ast.NodeTypeError(node, "Block");
  }

  // Node logic
  node.statements = [];
  utils._.each(node.ast_childs, function (statement) {
    node.statements.push(new Ast.node("Statement", statement));
  });

  // Check async
  node.isAsync = false;
  utils._.each(node.statements, function (statement) {
    if (statement.isAsync) {
      node.isAsync = true;
    }
  });

  // Node compile
  node.compile = function (context) {
    var _context = utils.context.clone(context);
    utils._.each(node.statements, function (statement) {
      //statement.compile(_context);
    });
    return node;
  };

  // Node export
  node.export = function (context) {
    var _context = utils.context.clone(context);
    // Async block
    if (node.isAsync) {
      var callOnFinish = _context.callOnFinish || "next";
      var result = "";
      result += "_tjs._block([";
      var needNewPromise = true;
      var promises = [];
      utils._.each(node.statements, function (statement) {
        if (needNewPromise) {
          needNewPromise = false;
          promises.push(
            "new Promise(")
        }
      });
      result += "])";
    }
    // Sync block
    else {
      var result = "";
      utils._.each(node.statements, function (statement) {
        result += statement.export(_context);
      });
    }
    return result;
  };

});

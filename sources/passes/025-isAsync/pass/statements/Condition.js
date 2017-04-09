var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Async IsAsync
IsAsync.register("Condition", function (node) {
  // Check async
  IsAsync.node("Expression", node.if.expression);
  IsAsync.node("Block", node.if.block);
  node.isAsync = false;
  if (node.if.expression.isAsync) {
    node.isAsync = true;
  }
  if (node.if.block.isAsync) {
    node.isAsync = true;
  }
  utils._.each(node.else_ifs, function (else_if) {
    IsAsync.node("Expression", else_if.expression);
    IsAsync.node("Block", else_if.block);
    if (else_if.expression.isAsync) {
      node.isAsync = true;
    }
    if (else_if.block.isAsync) {
      node.isAsync = true;
    }
  });
  IsAsync.node("Block", node.else.block);
  if (node.else) {
    if (node.else.block.isAsync) {
      node.isAsync = true;
    }
  }
});

var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// For IsAsync
IsAsync.register("For", function (node) {
  // Check async
  IsAsync.node("Expression", node.condition);
  IsAsync.node("Block", node.block);
  node.isAsync = false;
  if (node.condition.isAsync) {
    node.isAsync = true;
  }
  if (node.block.isAsync) {
    node.isAsync = true;
  }
});

var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// While IsAsync
IsAsync.register("Repeat", function (node) {
  // Check async
  IsAsync.node("Expression", node.iterations);
  IsAsync.node("Block", node.block);
  node.isAsync = false;
  if (node.iterations.isAsync) {
    node.isAsync = true;
  }
  if (node.block.isAsync) {
    node.isAsync = true;
  }
});

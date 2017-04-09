var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Async IsAsync
IsAsync.register("Async", function (node) {
  // Check async
  IsAsync.node("Block", node.block);
  node.isAsyncOnCall = false;
  if (node.block.isAsync) {
    node.isAsyncOnCall = true;
  }
});

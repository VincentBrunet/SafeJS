var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Function IsAsync
IsAsync.register("Function", function (node) {
  // Check async
  IsAsync.node("Block", node.block);
  node.isAsyncOnCall = false;
  if (node.block.isAsync) {
    node.isAsyncOnCall = true;
  }
});

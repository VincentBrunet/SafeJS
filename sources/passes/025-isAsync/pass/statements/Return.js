var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Return IsAsync
IsAsync.register("Return", function (node) {
  // Check async
  IsAsync.node(node.value.ast_type, node.value);
  node.isAsync = false;
  if (node.value.isAsync) {
    node.isAsync = true;
  }
});

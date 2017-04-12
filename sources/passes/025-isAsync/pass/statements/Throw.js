var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Throw IsAsync
IsAsync.register("Throw", function (node) {
  // Check async
  IsAsync.node(node.value.ast_type, node.value);
  node.isAsync = false;
  if (node.value.isAsync) {
    node.isAsync = true;
  }
});

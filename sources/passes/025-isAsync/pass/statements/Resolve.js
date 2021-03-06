var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Resolve IsAsync
IsAsync.register("Resolve", function (node) {
  // Check async
  IsAsync.node(node.value.ast_type, node.value);
  node.isAsync = false;
  if (node.value.isAsync) {
    node.isAsync = true;
  }
});

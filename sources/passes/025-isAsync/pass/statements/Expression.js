var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Function IsAsync
IsAsync.register("Expression", function (node) {
  // Check async
  IsAsync.node(node.content.ast_type, node.content);
  node.isAsync = false;
  if (node.content.isAsync) {
    node.isAsync = true;
  }
});

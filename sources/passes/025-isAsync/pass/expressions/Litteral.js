var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Litteral IsAsync
IsAsync.register("Litteral", function (node) {
  // Check async
  IsAsync.node(node.content.ast_type, node.content);
  node.isAsync = false;
  if (node.content.isAsync) {
    node.isAsync = true;
  }
});

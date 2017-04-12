var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Statement IsAsync
IsAsync.register("Statement", function (node) {
  // Check async
  IsAsync.node(node.content.ast_type, node.content);
  node.isAsync = false;
  if (node.content.isAsync) {
    node.isAsync = true;
  }
});

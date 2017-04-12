var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Javascript array IsAsync
IsAsync.register("Block", function (node) {
  // Check async
  node.isAsync = false;
  utils._.each(node.statements, function (statement) {
    IsAsync.node("Statement", statement);
    if (statement.isAsync) {
      node.isAsync = true;
    }
  });
});

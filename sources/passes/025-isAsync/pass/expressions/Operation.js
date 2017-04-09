var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Operation IsAsync
IsAsync.register("Operation", function (node) {
  // Check async
  IsAsync.node("Expression", node.e1);
  IsAsync.node("Expression", node.e2);
  node.isAsync = false;
  if (node.e1.isAsync) {
    node.isAsync = true;
  }
  if (node.e2) {
    if (node.e2.isAsync) {
      node.isAsync = true;
    }
  }
  if (node.op == "@") {
    node.isAsync = true;
  }
});

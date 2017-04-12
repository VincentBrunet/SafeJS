var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// TryCatch IsAsync
IsAsync.register("TryCatch", function (node) {
  // Check async
  node.isAsync = false;
  IsAsync.node("Block", node.try);
  if (node.try.isAsync) {
    node.isAsync = true;
  }
  if (node.finally) {
    IsAsync.node("Block", node.finally);
    if (node.finally.isAsync) {
      node.isAsync = true;
    }
  }
  utils._.each(node.catches, function (_catch) {
    IsAsync.node("Block", _catch);
    if (_catch.isAsync) {
      node.isAsync = true;
    }
  });
});

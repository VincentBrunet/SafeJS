var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Javascript Dict IsAsync
IsAsync.register("Dict", function (node) {
  // Check async
  node.isAsync = false;
  utils._.each(node.elements, function (element) {
    IsAsync.node(element.ast_type, element);
    if (element.isAsync) {
      node.isAsync = true;
    }
  });
});

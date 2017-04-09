var utils = require("../../../../utils");
var IsAsync = require("../IsAsync");

// Javascript array IsAsync
IsAsync.register("Tuple", function (node) {
  // Check async
  node.isAsync = false;
  utils._.each(node.elements, function (element) {
    IsAsync.node(element.ast_type, element);
    if (element.isAsync) {
      node.isAsync = true;
    }
  });
});

var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Throw", function (node) {
  return "throw " + Export.node(node.value.ast_type, node.value);
});

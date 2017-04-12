var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Return", function (node) {
  return "return " + Export.node(node.value.ast_type, node.value);
});

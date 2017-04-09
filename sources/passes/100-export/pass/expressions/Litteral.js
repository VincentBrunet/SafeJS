var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Litteral", function (node) {
  return Export.node(node.content.ast_type, node.content);
});

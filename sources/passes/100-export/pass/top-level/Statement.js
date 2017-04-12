var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Statement", function (node) {
  return Export.node(node.content.ast_type, node.content);
});

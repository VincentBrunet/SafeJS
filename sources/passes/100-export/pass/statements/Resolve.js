var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Resolve", function (node) {
  return "/* resolve " + Export.node(node.value.ast_type, node.value) + "*/";
});

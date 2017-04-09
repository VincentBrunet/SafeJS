var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Identifier", function (node) {
  return node.value;
});

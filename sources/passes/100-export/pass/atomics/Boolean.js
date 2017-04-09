var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Boolean", function (node) {
  return node.value;
});

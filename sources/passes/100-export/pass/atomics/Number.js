var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Number", function (node) {
  return node.value;
});

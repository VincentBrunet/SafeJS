var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("String", function (node) {
  return "\"" + node.value + "\"";
});

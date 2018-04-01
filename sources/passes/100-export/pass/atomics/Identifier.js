var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Identifier", function (node) {
  if (node.value == "this") {
    return Export.std.this;
  }
  return node.value;
});

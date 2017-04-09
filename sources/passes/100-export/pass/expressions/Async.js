var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Async", function (node) {
  var str = "";
  str += "function()";
  str += "{";
  str += Export.node("Block", node.block);
  str += "}";
  return str;
});

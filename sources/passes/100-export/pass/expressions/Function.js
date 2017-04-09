var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Function", function (node) {
  var str = "";
  str += "function ";
  if (node_name) {
    str += node.name;
  } else {
    str += "/* ANONYMOUS */";
  }
  str += " " + Export.node("FunctionParams", node.params);
  str += " {";
  str += "\n";
  str += Export.node("Block", node.block);
  str += "}";
  return str;
});

Export.register("FunctionParams", function (node) {
  var results = [];
  utils._.each(node.params, function (param) {
    results.push(Export.node("FunctionParam", param));
  });
  return "(" + results.join(", ") + ")";
});

Export.register("FunctionParam", function (node) {
  var str = "";
  str += node.name;
  return str;
});


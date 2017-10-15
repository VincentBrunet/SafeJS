var utils = require("../../../../utils");
var Export = require("../Export");

Export.register("Variable", function (node) {
  if (node.isAsync) {
    var str = "";
    str += "function(" + Export.std.next + "){";
    str += Export.std.async + "._assign(";
    if (node.value.isAsync) {
      str += "[1," + Export.node("Expression", node.value) + "]";
    }
    else {
      str += "[0," + Export.node("Expression", node.value) + "]";
    }
    str += ",";
    str += "function(" + Export.std.tmp1 + "){";
    str += node.name + "=" + Export.std.tmp1 + ";";
    str += "}";
    str += "," + Export.std.next + ");";
    str += "}";
    return str;
  }
  else {
    var str = "";
    // str += "var ";
    str += node.name;
    str += "=";
    str += Export.node("Expression", node.value);
    // if (node.readonly) {
    //   str += " // READ ONLY";
    // }
    return str;
  }
});

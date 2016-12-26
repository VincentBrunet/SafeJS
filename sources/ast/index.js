
var Ast = require("./Ast");

require("./top-level/Block");
require("./top-level/Statement");

require("./statements/Expression");
require("./statements/Variable");
require("./statements/Return");

require("./expressions/Function");
require("./expressions/Litteral");

require("./basics/Type");

require("./atomics/Identifier");
require("./atomics/Null");
require("./atomics/Number");
require("./atomics/Undefined");

module.exports = Ast;

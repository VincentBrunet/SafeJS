
var Ast = require("./Ast");

require("./top-level/Block");
require("./top-level/Statement");

require("./statements/Expression");
require("./statements/Variable");
require("./statements/Return");
require("./statements/Resolve");
require("./statements/Throw");
require("./statements/Condition");
require("./statements/TryCatch");
require("./statements/For");
require("./statements/While");
require("./statements/Break");
require("./statements/For");
require("./statements/Enum");

require("./expressions/Function");
require("./expressions/Async");
require("./expressions/Litteral");
require("./expressions/Operation");
require("./expressions/Class");

require("./basics/Type");
require("./basics/Tuple");
require("./basics/Array");
require("./basics/Dict");

require("./atomics/Identifier");
require("./atomics/Null");
require("./atomics/Number");
require("./atomics/String");
require("./atomics/Boolean");
require("./atomics/Undefined");

module.exports = Ast;

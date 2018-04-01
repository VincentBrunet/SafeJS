
module.exports = {

  make: {

    Block: require("./top-level/Block"),
    Statement: require("./top-level/Statement"),

    Break: require("./statements/Break"),
    Condition: require("./statements/Condition"),
    Continue: require("./statements/Continue"),
    Expression: require("./statements/Expression"),

    /*
    For: require("./statements/For"),
    Repeat: require("./statements/Repeat"),
    Resolve: require("./statements/Resolve"),
    Variable: require("./statements/Variable"),
    Return: require("./statements/Return"),
    Throw: require("./statements/Throw"),
    TryCatch: require("./statements/TryCatch"),
    While: require("./statements/While"),

    //Enum: require("./expressions/Enum"),
    Function: require("./expressions/Function"),
    Async: require("./expressions/Async"),
    Litteral: require("./expressions/Litteral"),
    Operation: require("./expressions/Operation"),
    Class: require("./expressions/Class"),

    Type: require("./basics/Type"),
    Tuple: require("./basics/Tuple"),
    Array: require("./basics/Array"),
    Dict: require("./basics/Dict"),

    Identifier: require("./atomics/Identifier"),
    Null: require("./atomics/Null"),
    Number: require("./atomics/Number"),
    String: require("./atomics/String"),
    Boolean: require("./atomics/Boolean"),
    Undefined: require("./atomics/Undefined"),
    */
  },

  read: {

    type: function (currentJson) {
      return currentJson.ast_type;
    },

    child: function (currentJson, expectedName) {
      return currentJson.ast_childs[expectedName];
    },

    hasChild: function (currentJson, expectedName) {
      return !!currentJson.ast_childs[expectedName];
    },

    childList: function (currentJson) {
      return currentJson.ast_childs;
    },

  },

  check: {

    type: function (currentJson, expectedType) {
      // TODO
    },

    child: function (currentJson, expectedName) {
      // TODO
    },

    childList: function (currentJson) {
      // TODO
    },

  },

};
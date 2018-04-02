// Basic utils
var utils = require("../../../utils");

module.exports = {

  make: {

    Block: require("./top-level/Block"),
    Statement: require("./top-level/Statement"),

    Break: require("./statements/Break"),
    Condition: require("./statements/Condition"),
    Continue: require("./statements/Continue"),
    Expression: require("./statements/Expression"),

    For: require("./statements/For"),
    Repeat: require("./statements/Repeat"),
    Resolve: require("./statements/Resolve"),

    Variable: require("./statements/Variable"),
    Return: require("./statements/Return"),
    Throw: require("./statements/Throw"),
    TryCatch: require("./statements/TryCatch"),
    While: require("./statements/While"),

    /*
    //Enum: require("./expressions/Enum"),
    */
    Function: require("./expressions/Function"),
    Async: require("./expressions/Async"),
    Litteral: require("./expressions/Litteral"),
    Operation: require("./expressions/Operation"),
    /*
    Class: require("./expressions/Class"),
    */

    Type: require("./basics/Type"),
    Tuple: require("./basics/Tuple"),
    Array: require("./basics/Array"),
    Dict: require("./basics/Dict"),

    Identifier: require("./atomics/Identifier"),
    Null: require("./atomics/Null"),
    Number: require("./atomics/Number"),
    String: require("./atomics/String"),
    Boolean: require("./atomics/Boolean"),
    //Undefined: require("./atomics/Undefined"),
  },

  read: {

    type: function (currentJson) {
      return currentJson.ast_type;
    },

    childList: function (currentJson) {
      return currentJson.ast_childs;
    },

    child: function (currentJson, expectedName) {
      return currentJson.ast_childs[expectedName];
    },

    hasChild: function (currentJson, expectedName) {
      return !!currentJson.ast_childs[expectedName];
    },

    data: function (currentJson, expectedName) {
      return currentJson.ast_datas[expectedName];
    },

    hasData: function (currentJson, expectedName) {
      return !!currentJson.ast_datas[expectedName];
    },

  },

  check: {

    type: function (currentJson, expectedType) {
      if (!currentJson) {
        throw "Undefined node!";
      }
      var currentType = currentJson.ast_type;
      if (utils._.isArray(expectedType)) {
        if (utils._.indexOf(expectedType, currentType) < 0) {
          throw "Type not within allowed types: " + currentType + " -> " + expectedType;
        }
      }
      else {
        if (currentType != expectedType) {
          throw "Not matching type: " + currentType + " -> " + expectedType;
        }
      }
    },

    childList: function (currentJson) {
      if (!currentJson) {
        throw "Undefined node!";
      }
      if (!currentJson.ast_childs) {
        throw "Node has no childs";
      }
      if (!utils._.isArray(currentJson.ast_childs)) {
        throw "Node does not have a list of child";
      }
    },

    child: function (currentJson, expectedName) {
      if (!currentJson) {
        throw "Undefined node!";
      }
      if (!currentJson.ast_childs) {
        throw "Node has no childs";
      }
      if (!currentJson.ast_childs[expectedName]) {
        throw "Node does not have a child: " + expectedName;
      }
    },

    data: function (currentJson, expectedName) {
      if (!currentJson) {
        throw "Undefined node!";
      }
      if (!currentJson.ast_datas) {
        throw "Node has no data";
      }
      if (currentJson.ast_datas[expectedName] == null || currentJson.ast_datas[expectedName] == undefined) {
        throw "Node does not have data: " + expectedName;
      }
    },

  },

};

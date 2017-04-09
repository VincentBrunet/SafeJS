// Basic utils
var utils = require("../../utils");

// Basic AST pass code
var IsAsync = require("./pass");

/**
 */
module.exports = function(session, astBefore, next) {
  try {
    var astIsAsync = new IsAsync.node("Block", astBefore);
    return next(true, astIsAsync);
  } catch (error) {
    return next(false, undefined, utils.trace.make(error));
  }
};


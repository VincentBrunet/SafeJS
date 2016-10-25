var utils = require("../utils");

module.exports = function(session, next) {
  session.profilingStart("compiler");
  utils.astDisplay(session.getParsedAst());
  session.profilingEnd("compiler");
  return next(true);
};

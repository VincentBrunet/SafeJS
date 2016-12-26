var utils = require("../utils");

module.exports = function(session, next) {
  session.profilingStart("compiler");

  var parsed = session.getParsedAst();
  // utils.astDisplay(session.getParsedAst());

  session.setCompiledAst(parsed);

  session.profilingEnd("compiler");
  return next(true);
};

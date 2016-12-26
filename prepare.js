
var utils = require("./sources/utils");
var peg = require("pegjs");

var grammarPrefix = "sources/grammar";
var grammars = [
    grammarPrefix + "/top-level/Globals.gf",
    grammarPrefix + "/top-level/Block.gf",
    grammarPrefix + "/top-level/Statement.gf",
    grammarPrefix + "/top-level/Expression.gf",
    grammarPrefix + "/statements/Class.gf",
    grammarPrefix + "/statements/Variable.gf",
    grammarPrefix + "/statements/Condition.gf",
    grammarPrefix + "/statements/Loop.gf",
    grammarPrefix + "/statements/Return.gf",
    grammarPrefix + "/statements/TryCatch.gf",
    grammarPrefix + "/expressions/Function.gf",
    grammarPrefix + "/expressions/Litteral.gf",
    grammarPrefix + "/expressions/Operation.gf",
    grammarPrefix + "/basics/Type.gf",
    grammarPrefix + "/basics/Array.gf",
    grammarPrefix + "/basics/Dict.gf",
    grammarPrefix + "/basics/Tuple.gf",
    grammarPrefix + "/atomics/Boolean.gf",
    grammarPrefix + "/atomics/Number.gf",
    grammarPrefix + "/atomics/String.gf",
    grammarPrefix + "/atomics/Identifier.gf",
    grammarPrefix + "/atomics/Whitespace.gf",
    grammarPrefix + "/atomics/Comment.gf",
    grammarPrefix + "/atomics/Null.gf",
    grammarPrefix + "/atomics/Undefined.gf",
];
utils.fileContents(grammars, function(success, contents, error, reason) {
    if (!success) {
        throw error;
    }
    var lines = contents.split(/\r?\n/);
    try {
        var toBuild = contents;
        var parser = peg.generate(toBuild, {
            output: "source",
            format: "commonjs",
            optimize: "speed",
            cache: true,
            trace: true,
        });
        utils.fileWrite("sources/parser/generated/index.js", parser, function (success, error) {
            if (!success) {
                throw error;
            }
            else {
                console.log("Parser Generated Successfully");
            }
        });
    } catch (error) {
        utils.errorDisplay(error, "Parser-Generate", grammarPrefix, lines)
        throw error;
    }
});
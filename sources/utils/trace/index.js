
var trace = {};

trace.make = function (error) {
    return {
        error: error,
    }
};

trace.next = function (trace) {
    return trace;
};

module.exports = trace;

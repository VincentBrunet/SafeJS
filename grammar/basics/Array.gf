
Array "Array" =
    "["
    _ values :(ArrayValue ",")*
    _ lastValue :ArrayValue?
    _ "]"
{
    var elements = [];
    values.forEach(function (value) {
        elements.push(value[0]);
    });
    if (lastValue) {
        elements.push(lastValue);
    }
    return {
        ast_type: "Array",
        ast_title: "[]",
        ast_childs: elements,
    }
}

ArrayValue =
    _ value :Expression
    _
{
    return {
        ast_type: "ArrayValue",
        ast_childs: {
            Value: value,
        }
    }
}
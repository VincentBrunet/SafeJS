
Dict "Dictionary" =
    "{"
    values :(_ DictValue _ ",")*
    lastValue :(_ DictValue)?
    _ "}"
{
    var elements = [];
    values.forEach(function (value) {
        elements.push(value[1]);
    });
    if (lastValue) {
        elements.push(lastValue[1]);
    }
    return ast({
        ast_type: "Dict",
        ast_title: "{x" + elements.length + "}",
        ast_childs: elements,
    });
}

DictValue =
    name :Identifier
    _ ":"
    _ value :Expression
{
    return {
        ast_type: "DictValue",
        ast_childs: {
            Name: name,
            Value: value,
        },
    };
}
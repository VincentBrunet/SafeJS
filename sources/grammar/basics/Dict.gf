
Dict "Dictionary" =
    "{"
    _ values :(DictValue ",")*
    _ lastValue :DictValue?
    _ "}"
{
    var elements = [];
    values.forEach(function (value) {
        elements.push(value[0]);
    });
    if (lastValue) {
        elements.push(lastValue);
    }
    return ast({
        ast_type: "Dict",
        ast_title: "{}",
        ast_childs: elements,
    });
}

DictValue =
    _ name :Identifier
    _ ":"
    _ value :Expression
{
    return {
        ast_type: "DictValue",
        ast_childs: {
            Name: name,
            Value: value,
        }
    };
}
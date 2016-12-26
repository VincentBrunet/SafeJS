
Tuple "Tuple" =
    "("
    _ values :(TupleValue ",")*
    _ lastValue :TupleValue?
    _ ")"
{
    var elements = [];
    values.forEach(function (value) {
        elements.push(value[0]);
    });
    if (lastValue) {
        elements.push(lastValue);
    }
    return ast({
        ast_type: "Tuple",
        ast_title: "()",
        ast_childs: elements,
    });
}

TupleValue =
    _ value :Expression
    _
{
    return ast({
        ast_type: "TupleValue",
        ast_childs: {
            Value: value,
        }
    });
}

Dict "Dictionary" =
    "{"
    values :(_ DictElement _ ",")*
    lastValue :(_ DictElement)?
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

DictElement =
    key :(DictKeyString/DictKeyExpression/DictKeyIdentifier)
    _ ":"
    _ value :DictValue
{
    return {
        ast_type: "DictElement",
        ast_title: "{:}",
        ast_childs: {
            Key: key,
            Value: value,
        },
    };
}

DictKeyIdentifier =
    identifier :Identifier
{
    return {
        ast_type: "DictKeyIdentifier",
        ast_childs: {
            Identifier: identifier,
        },
    }
}

DictKeyString =
    string :String
{
    return {
        ast_type: "DictKeyString",
        ast_childs: {
            String: string,
        },
    };
}

DictKeyExpression =
    "<"
    _ expression :Expression
    ">"
{
    return {
        ast_type: "DictKeyExpression",
        ast_childs: {
            Expression: expression,
        },
    };
}

DictValue =
    expression :Expression
{
    return {
        ast_type: "DictValue",
        ast_childs: {
            Expression: expression,
        },
    };
}

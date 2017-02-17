

TypePartTemplate =
    '<'
    _ types :(Type _ ',' _)*
    _ lastType :Type?
    _ '>'
{
    var _types = [];
    types.forEach(function (type) {
        _types.push(type[0]);
    })
    if (lastType) {
        _types.push(lastType);
    }
    return ast({
        ast_type: "TypeTemplate",
        ast_childs: _types,
    });
}

TypeRegular =
    name :Identifier
    p_templates :(_ TypePartTemplate)?
{
    var _templates;
    if (p_templates) {
        _templates = p_templates[1];
    }
    return ast({
        ast_type: "TypeRegular",
        ast_childs: {
            Name: name,
            Templates: _templates,
        },
    });
}

TypeTuple =
    '('
    _ types :(Type _ ',' _)*
    _ lastType :Type?
    _ ')'
{
    var _types = [];
    types.forEach(function (type) {
        _types.push(type[0]);
    })
    if (lastType) {
        _types.push(lastType);
    }
    return ast({
        ast_type: "TypeTuple",
        ast_childs: _types,
    });
}

TypeDict =
    '{'
    _ types :(Type _ ':' _ Type)?
    _ '}'
{
    var keys;
    var values;
    if (types) {
        keys = types[0];
        values = types[4];
    }
    return ast({
        ast_type: "TypeDict",
        ast_childs: {
            Keys: keys,
            Values: values,
        },
    });
}

TypeArray =
    '['
    _ type :Type?
    _ ']'
{
    return {
        ast_type: "TypeArray",
        ast_childs: {
            Type: type,
        },
    };
}

TypePromise =
    '@'
    p_type: (_ Type)?
{
    var type;
    if (p_type) {
        type = p_type[1];
    }
    return {
        ast_type: "TypePromise",
        ast_childs: {
            Type: type,
        },
    };
}

Type "Type" =
    content :(
        TypeRegular
        / TypeArray
        / TypeDict
        / TypeTuple
        / TypePromise
    )
{
    return {
        ast_type: "Type",
        ast_childs: {
            Content: content,
        },
    };
}

Typed "Type" =
    type:(':' _ Type)
{
    return type[2];
    return {
        ast_type: "Typed",
        ast_childs: {
            Type: type[2],
        },
    };
}


StringChars =
    value:$([0-9A-Z:a-z_\- ,#\./]*)
{
    return ast({
        ast_type: "String",
        ast_title: value,
        ast_datas: {
            Value: value,
        },
    });
}

StringDouble =
    "'"
    content :StringChars
    "'"
{
    return content;
}

StringSimple = 
    '"'
    content :StringChars
    '"'
{
    return content;
}

String "String" =
    str :(StringSimple/StringDouble)
{
    return str;
}


String "String" =
    '"'
    content: [0-9A-Za-z_-]*
    '"'
{
    return {
        ast_type: "String",
        ast_title: content.join(""),
    };
}

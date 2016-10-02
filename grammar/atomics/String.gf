
String "String" =
    '"'
    content: [A-Za-z_-]*
    '"'
{
    return {
        ast_type: "String",
        ast_title: content.join(""),
    };
}

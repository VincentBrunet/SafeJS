
Expression "Expression" =
    content:(
        Operation
        / ExpressionSimple
    )
{
    return {
        ast_type: "Expression",
        ast_title: "()",
        ast_childs: {
            Content: content,
        },
    };
}

ExpressionSimple =
    content:(
        Function
        / Class
        / Litteral
        / Identifier
        / Native
    )
{
    return content;
}

Native =
    "#"
{
    return {
        ast_type: "Native",
        ast_title: "!",
    };
}

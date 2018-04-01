
Expression "Expression" =
    content: ExpressionContent
{
    return ast({
        ast_type: "Expression",
        ast_title: "()",
        ast_childs: {
            Content: content,
        },
    });
}

ExpressionContent =
    content:(
        Operation
        / ExpressionSimple
    )
{
    return content;
};

ExpressionSimple =
    content:(
        Function
        / Async
        / Class
        / Litteral
        / Identifier
        / Native
    )
{
    return content;
}

Native =
    "~"
{
    return ast({
        ast_type: "Native",
        ast_title: "#",
    });
}

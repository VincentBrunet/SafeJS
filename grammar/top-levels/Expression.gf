
Expression "Expression" =
    content:(
        ExpressionSimple
        / Operation
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
        / Litteral
        / Identifier
    )
{
    return content;
}


Expression "Expression" =
    content: ExpressionContent
{
    return Expressionize(content);
}

ExpressionContent =
    content:(
        Operation
        / ExpressionSimple
    )
{
    return Expressionize(content);
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
    return Expressionize(content);
}

Native =
    "~"
{
    return ast({
        ast_type: "Native",
        ast_title: "#",
    });
}

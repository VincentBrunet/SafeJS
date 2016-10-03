
Expression "Expression" =
    content:(
        Function
        / Operation
        / Litteral
        / Identifier
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

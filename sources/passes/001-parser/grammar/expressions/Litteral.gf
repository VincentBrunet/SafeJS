
Litteral "Litteral" =
    content:(
        Number
        / String
        / Boolean
        / Dict
        / Array
        / Tuple
        / Null
        / Undefined
    )
{
    return ast({
        ast_type: "Litteral",
        ast_childs: {
            Content: content,
        },
    });
}

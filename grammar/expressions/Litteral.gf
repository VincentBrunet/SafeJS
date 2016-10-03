
Litteral "Litteral" =
    content:(
        Number
        / String
        / Boolean
        / Dict
        / Array
        / Tuple
    )
{
    return {
        ast_type: "Litteral",
        ast_childs: {
            Content: content,
        },
    };
}

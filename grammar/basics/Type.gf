
Type "Type" =
    id:Identifier
{
    return {
        ast_type: "Type",
        ast_childs: {
            Name: id,
        },
    }
}

Typed "Type" =
    type:(':' _ Type)
{
    return {
        ast_type: "Typed",
        ast_childs: {
            Type: type[2],
        },
    };
}

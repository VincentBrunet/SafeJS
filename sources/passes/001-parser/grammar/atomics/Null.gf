
Null "Null" =
    content:('null'/'NULL')
{
    return ast({
        ast_type: "Null",
        ast_title: "null",
    });
}

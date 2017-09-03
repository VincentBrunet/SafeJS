
Null "Null" =
    'null'/'NULL'
{
    return ast({
        ast_type: "Null",
    });
}

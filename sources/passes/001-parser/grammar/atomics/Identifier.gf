
Identifier "Identifier" =
    i:[$A-Za-z0-9_]+
{
    var value = i.join("");
    return ast({
        ast_type: "Identifier",
        ast_title: value,
        ast_datas: {
            Value: value,
        },
    });
}

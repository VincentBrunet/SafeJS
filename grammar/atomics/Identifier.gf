
Identifier "Identifier" =
    i:[A-Za-z_0-9]+
{
    var value = i.join("");
    return {
        ast_type: "Identifier",
        ast_title: value,
        ast_datas: {
            value: value,
        },
    };
}

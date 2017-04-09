
Boolean "Boolean" =
    value:('true'/'false')
{
    return ast({
        ast_type: "Boolean",
        ast_title: value,
        ast_datas: {
            value: value,
        },
    });
}

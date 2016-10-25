
Boolean "Boolean" =
    value:('true'/'false')
{
    return {
        ast_type: "Boolean",
        ast_title: value,
    };
}

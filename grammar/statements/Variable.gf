
Variable "Variable" =
    mode:("var"/"let") __
    _ name :Identifier
    _ typed :Typed?
    _ value :("=" _ Expression)?
{
    var val;
    if (value) {
        val = value[2];
    }
    return {
        ast_type: "Variable",
        ast_title: mode,
        ast_childs: {
            Name: name,
            Typed: typed,
            Value: val,
        },
        ast_datas: {
            mode: mode,
        },
    };
}
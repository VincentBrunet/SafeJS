
Variable "Variable" =
    mode:("var"/"let") __
    _ name :Identifier
    type :(_ Typed)?
    value :(_ "=" _ Expression)?
{
    var val;
    if (value) {
        val = value[3];
    }
    var t;
    if (type) {
        t = type[1];
    }
    var isConst = false;
    if (mode == "let") {
        isConst = true;
    }
    return ast({
        ast_type: "Variable",
        ast_title: mode,
        ast_childs: {
            Identifier: name,
            Type: t,
            Expression: val,
        },
        ast_datas: {
            Const: isConst,
        },
    });
}

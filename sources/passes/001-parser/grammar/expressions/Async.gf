
Async "Async" =
    ("async"/"@")
    _ type :Typed?
    _ '{'
    _ block: Block
    _ '}'
{
    return ast({
        ast_type: "Async",
        ast_title: "async",
        ast_childs: {
            Type: type,
            Block: block,
        },
    });
}

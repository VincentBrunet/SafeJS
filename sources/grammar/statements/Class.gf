
Class "Class" =
    "class"
    p_name :(__ Identifier)?
    _ type :Typed?
    _ '{'
    _ block: Block
    _ '}'
{
    var name;
    if (p_name) {
        name = p_name[1];
    }
    return ast({
        ast_type: "Class",
        ast_title: "@",
        ast_childs: {
            Name: name,
            Type: type,
            Block: block,
        }
    });
}

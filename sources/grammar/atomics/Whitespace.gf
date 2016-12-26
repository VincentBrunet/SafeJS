
_ "Space"
  = (Comment/([ \t\n\r]))*
{
    return ast({
        ast_type: "Whitespace",
    });
}

__ "Space"
  = Comment* (([ \t\n\r]+) Comment*)+
{
    return ast({
        ast_type: "Whitespace",
    });
}

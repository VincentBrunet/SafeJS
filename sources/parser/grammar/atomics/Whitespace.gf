
_ "Space"
  = (Comment/([ \t\n\r]))*
{
    return {
        ast_type: "Whitespace",
    }
}

__ "Space"
  = Comment* (([ \t\n\r]+) Comment*)+
{
    return {
        ast_type: "Whitespace",
    }
}

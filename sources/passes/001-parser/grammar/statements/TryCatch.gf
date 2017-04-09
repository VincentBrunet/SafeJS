

Catch =
    _ "catch"
    error: (
        (_ '(' _ Identifier (_ Typed)?)
        / (__ Identifier (_ Typed)?)
    )
    _ '{'
    _ block :Block
    _ '}'
{
    var identifier;
    var type;
    if (error.length == 5) {
        identifier = error[3];
        if (error[4]) {
            type = error[4][1];
        }
    }
    if (error.length == 3) {
        identifier = error[1];
        if (error[2]) {
            type = error[2][1];
        }
    }
    return ast({
        ast_type: "Catch",
        ast_childs: {
            Identifier: identifier,
            Type: type,
            Block: block,
        },
    })
}


TryCatch "Try-Catch" =
    'try'
    _ '{'
    _ tryBlock: Block
    _ '}'
    catches :Catch*
    finallyB :(
        _ 'finally'
        _ '{'
        _ Block
        _ '}'
    )?
{
    var finallyBlock;
    if (finallyB) {
        finallyBlock = finallyB[5];
    }
    return ast({
        ast_type: "TryCatch",
        ast_childs: {
            TryBlock: tryBlock,
            Catches: catches,
            FinallyBlock: finallyBlock,
        },
    });
}
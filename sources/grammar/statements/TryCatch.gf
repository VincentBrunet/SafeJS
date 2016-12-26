
TryCatch "Try-Catch" =
    'try'
    _ '{'
    _ tryBlock: Block
    _ '}'
    _ 'catch'
    error :(
        (_ '(' _ Identifier _ ')')
        / (__ Identifier)
    )
    _ '{'
    _ catchBlock: Block
    _ '}'
    finallyB :(
        _ 'finally'
        _ '{'
        _ Block
        _ '}'
    )?
{
    var catchLabel;
    if (error.length == 6) {
        catchLabel = error[3];
    }
    else {
        catchLabel = error[1];
    }
    var finallyBlock;
    if (finallyB) {
        finallyBlock = finallyB[5];
    }
    return ast({
        ast_type: "TryCatch",
        ast_childs: {
            TryBlock: tryBlock,
            CatchLabel: catchLabel,
            CatchBlock: catchBlock,
            FinallyBlock: finallyBlock,
        }
    });
}
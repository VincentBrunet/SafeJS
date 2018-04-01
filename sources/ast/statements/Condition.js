
module.exports = function Condition() {

    this.parent = null;

    this.ifExpression = null;
    this.ifBlock = null;
    this.elseIfs = [];
    this.elseBlock = null;

    this.isAsync = false;

    this.json = null;

};

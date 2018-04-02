
module.exports = function Condition() {

    this.parent = null;

    this.tryBlock = null;
    this.catches = [];
    this.finallyBlock = null;

    this.isAsync = false;

    this.json = null;

};

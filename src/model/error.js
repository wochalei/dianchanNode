class error extends Error{
    constructor(msg,code=400){
        super()
        this.msg=msg;
        this.code=code
    }
}

module.exports = error
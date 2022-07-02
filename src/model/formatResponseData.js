class formatData{
    constructor(ctx,data=null,msg="success",extra=null,code=200){
        this.ctx=ctx;
        this.data=data;
        this.msg=msg;
        this.extra=extra;
        this.code=code;
    }
    sendBody(){
      
         this.ctx.body = {
            msg:this.msg,
            data:this.data,
            extra:this.extra,
            code:this.code
        } 
    }
}
module.exports = formatData
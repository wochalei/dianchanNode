const {error} = require('../model/responseModel')
//这个能全局捕获错误
//因为use中间件在顶端 中间件直接的执行顺序类似栈 先进后出，所以 因为是异步的 所以都await 最后还是 异步下的栈顺序
//还是先进后出，所以如果路由执行的控制器报错，
// 作用域链下的throw 都能捕获，但是如果语法错就可能直接终止 
//且报错后 错误点后要执行的语句停止
const handError = async (ctx,next)=>{
    try{
           await next();
    }catch(e){
        console.log(e);
        if(e instanceof error){
           
            ctx.body=e
            ctx.status = e.code;
        }else{
            
            ctx.body =  '服务器未知错误';
            ctx.status = 500;
        }        
    }
}
module.exports = handError
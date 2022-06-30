const error = require('../model/error')
//这个能全局捕获错误
//因为use中间件在顶端 中间件直接的执行顺序类似栈 先进后出，所以 因为是异步的 所以都await 最后还是 异步下的栈顺序
//还是先进后出，所以如果路由执行的控制器报错，
//就是不太清楚，为什么控制器报错 能传到await next那，不知道什么方式传来的 而且只能捕获next 控制器下爆的错
// 我猜是 next与next间有返回值 默认把error传递，所以能捕获，但如果在控制器下的 调用别人的函数里报错就捕获不了
// 因为该错误没有做返回值返回给捕获
const handError = async (ctx,next)=>{
    try{
           await next();
    }catch(e){
       
        if(e instanceof error){
           
            ctx.body={msg:e.msg}
            ctx.status = e.code;
        }else{
            
            ctx.body =  '服务器未知错误';
            ctx.status = 500;
        }        
    }
}
module.exports = handError
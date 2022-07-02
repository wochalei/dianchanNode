const Token = require('../model/token')


const verifyToken = (ctx,next)=>{
    const { token } = ctx.request.body;
    new Token().verify(token)
   
    next();
}

module.exports = verifyToken
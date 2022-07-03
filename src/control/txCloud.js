const formatResponseData = require('../model/formatResponseData')
const DB = require('../DB/database')
async function uploadTcloud (ctx){
    const res = await DB.uploadFile(ctx.file.filename,ctx.file.path)
    new formatResponseData(ctx,{url:res.Location}).sendBody();
      
}

module.exports = uploadTcloud
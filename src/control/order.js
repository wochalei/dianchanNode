const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')
const moment = require('moment')
const Token = require('../model/token');
const FormCheck = require('../model/FormCheck')
class Order {
    constructor() {

    }
    async get(ctx) {
      const { page,transacStatus} = ctx.request.body;
      let sql = '';
      if(transacStatus) sql = `db.collection("order").where({transacStatus:'${transacStatus}'}).skip(${Number(page)*10}).limit(10).get()`
      else  sql = `db.collection("order").skip(${Number(page)*10}).limit(10).get()` 
      const res = await DB.link('get', sql);
      new formatResponseData(ctx, {data:res.data,pager:res.data.pager}).sendBody();
    }

    async accptStatus(ctx) {
      const {id,openid,total} = ctx.request.body;
      const sql = `db.collection("order").doc("${id}").update({data:{transacStatus:"success"}})`
      const res = await DB.link('updated', sql);
      if (res.data.matched == 0) return new formatResponseData(ctx, null, '修改失败').sendBody()
      const obj = {template_id:'GcOj-Sa8gzNwwPxR5WsxYtiwrbc4kK36GV7bneJ5xa8',touser:openid,
      data:{
        'character_string3':{"value":  id },
        'amount1':{"value":  total },
        'time2':{"value": moment().utcOffset(8).format('YYYY-MM-DD') }
      }}
      
     const ding = await DB.sendTemplate(obj)
   
      
      new formatResponseData(ctx, null, '修改成功').sendBody()
  
    }
    async accptOrder(ctx) {
      const { id } = ctx.request.body;
      const sql = `db.collection("order").doc("${id}").update({data:{orderReceiving:"success"}})`
      const res = await DB.link('updated', sql);
      if (res.data.matched == 0) return new formatResponseData(ctx, null, '修改失败').sendBody()
      new formatResponseData(ctx, null, '修改成功').sendBody()
  
    }
    async getDetails(ctx) {
      const { id} = ctx.request.body;
      const sql = `db.collection("order").doc("${id}").get()`
      const res = await DB.link('get', sql);
      new formatResponseData(ctx, res.data).sendBody();
    }
}

module.exports = new Order();
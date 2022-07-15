const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')
const moment = require('moment')
const Token = require('../model/token');
const FormCheck = require('../model/FormCheck')
class Qr {
    constructor() {

    }
    async get(ctx) {
      const sql = `db.collection("qr").get()`;
      const res = await DB.link('get', sql);
      new formatResponseData(ctx, res.data).sendBody();
    }
    async add(ctx){
     const {tableName} = ctx.request.body;
     const getSql = `db.collection("qr").where({tableName:"${tableName}"}).get()`;
     const getRes = await DB.link('get',getSql);
     if(getRes.data.length!=0) {
        new formatResponseData(ctx, null,'已存在','',400).sendBody();
        return;
     }
     const res = await DB.addQr(tableName)
     const addQr = await DB.putQrTx(res.data);
     const addSql = `db.collection("qr").add({data:[{tableName:"${tableName}",url:"https://${addQr.Location}",time:"${moment().utcOffset(8).format('YYYY-MM-DD')}"}]})`
     const addRes =  await DB.link('add',addSql);
     new formatResponseData(ctx, null,'添加成功').sendBody();
    }
}

module.exports = new Qr();
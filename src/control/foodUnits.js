const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')
const Token = require('../model/token');
const FormCheck = require('../model/FormCheck')
class FoodUnits {
    constructor() {

    }
    async get(ctx) {
      const { userId } = ctx.request.body;
      const sql = `db.collection("foodUnits").where({userId:"${userId}"}).get()`
      const res = await DB.link('get', sql);
      new formatResponseData(ctx, res.data.data).sendBody();
    }
    async add(ctx) {
      const { userId, name, } = ctx.request.body;
      const getSql = `db.collection("foodUnits").where({name:"${name}"}).get()`;
      const addSql = `db.collection("foodUnits").add({
            data:[
                {
                    userId:"${userId}", 
                    name:"${name}",

                }
            ]
        })`
      const getRes = await DB.link('get', getSql);
      if (getRes.data.data != 0) return new formatResponseData(ctx, null, "信息已存在").sendBody();
      const addRes = await DB.link('add', addSql);
      new formatResponseData(ctx, null, '添加成功').sendBody();
    }
    async updated(ctx) {
      const { id, name } = ctx.request.body;
      const getSql = `db.collection("foodUnits").where({name:"${name}"}).get()`;
      const getRes = await DB.link('get', getSql);
      if (getRes.data.data != 0) return new formatResponseData(ctx, null, "菜单名已存在").sendBody();
      const sql = `db.collection("foodUnits").doc("${id}").update({data:{
        name:"${name}",
        }})`;
      const res = await DB.link('updated', sql);
      if (res.data.matched == 0) return new formatResponseData(ctx, null, '修改失败').sendBody()
      new formatResponseData(ctx, null, '修改成功').sendBody()
  
    }
    async deleted(ctx) {
      const { id } = ctx.request.body;
      const sql = `db.collection("foodUnits").doc("${id}").remove()`;
      const res = await DB.link('deleted', sql);
      console.log(res);
      if (res.data.deleted == 0) return new formatResponseData(ctx, null, '删除失败或不存在').sendBody()
      new formatResponseData(ctx, null, '删除成功').sendBody()
    }
}

module.exports = new FoodUnits();
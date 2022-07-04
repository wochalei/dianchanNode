const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')
const Token = require('../model/token');
const FormCheck = require('../model/FormCheck')
class FoodTypes {
    constructor() {

    }
    async get(ctx) {
        const { userId } = ctx.request.body;
        const sql = `db.collection("foodTypes").where({userId:"${userId}"}).get()`
        const res = await DB.link('get', sql);
        new formatResponseData(ctx,res.data.data).sendBody();
    }
    async add(ctx) {
        const { userId,value,label,count } = ctx.request.body;
        const getSql = `db.collection("foodTypes").where({label:"${label}"}).get()`;
        const addSql = `db.collection("foodTypes").add({
            data:[
                {
                    userId:"${userId}",
                    value:"${value}",
                    label:"${label}",
                    count:${count},
                }
            ]
        })`
        const getRes =  await DB.link('get', getSql);
        if(getRes.data.data!=0) return new formatResponseData(ctx,null,"种类已存在").sendBody();
        const addRes = await DB.link('add', addSql);
        new formatResponseData(ctx,null,'添加成功').sendBody();
    }
    async updated(ctx) {
        const { id,value,label,count } = ctx.request.body;
        const sql = `db.collection("foodTypes").doc("${id}").update({data:{
            value:"${value}",label:"${label}"
        }})`;
        const res= await DB.link('updated', sql);
        if(res.data.matched==0) return new formatResponseData(ctx, null, '修改失败').sendBody()
        new formatResponseData(ctx, null, '修改成功').sendBody()

    }
    async deleted(ctx) {
        const { id } = ctx.request.body;
        const sql = `db.collection("foodTypes").doc("${id}").remove()`;
        const res= await DB.link('deleted', sql);
        if(res.data.deleted==0) return new formatResponseData(ctx, null, '删除失败').sendBody()
        new formatResponseData(ctx, null, '删除成功').sendBody()
    }
}

module.exports = new FoodTypes();
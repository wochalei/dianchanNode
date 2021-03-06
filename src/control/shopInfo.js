const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')

const FormCheck = require('../model/FormCheck')
class ShopInfo {
    constructor() {
    }
    async get(ctx) {
        const { userId } = ctx.request.body;
        const sql = `db.collection("shop_info").get()`;
        const res = await DB.link('get', sql);

        if (res.data.length == 0) return new formatResponseData(ctx, null, '信息不存在').sendBody();
        const data = res.data[0]; 
        new formatResponseData(ctx, data).sendBody();
    }
    async add(ctx) {
        const { name, address, logo, userId } = ctx.request.body;
       
        const sql = `db.collection("shop_info").where({userId:"${userId}"}).get()`;
        const res = await DB.link('get', sql);
        
        if (res.data.data.length != 0) return new formatResponseData(ctx, null, '账号已存在').sendBody();
        const add = `db.collection("shop_info").add({data:[
        {
            name:"${name}",
            address:"${address}",
            logo:"${logo}",
            userId:"${userId}"}
        ]})`;
        const addRes = await DB.link('add', add);
        
        new formatResponseData(ctx, { userId: addRes.data.id_list }, '添加成功').sendBody()
    }
    async updated(ctx) {
        const { name, address, logo, userId } = ctx.request.body;
        const sql = `db.collection("shop_info").where({userId:"${userId}"}).update({data:{
            name:"${name}",address:"${address}",logo:"${logo}"
        }})`;
        const res= await DB.link('updated', sql);
        //和get一样，数据库执行成功后，需要根据数据判断对错 就额外写formatResponseData格式化错误返回
        if(res.data.matched==0) return new formatResponseData(ctx, null, '修改失败').sendBody()
        new formatResponseData(ctx, null, '修改成功').sendBody()
    }

}

module.exports = new ShopInfo();
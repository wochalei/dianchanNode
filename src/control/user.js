const DB = require('../DB/database')
const formatResponseData = require('../model/formatResponseData')
const Token =  require('../model/token');
const FormCheck = require('../model/FormCheck')
class User {
  constructor() {
   
  }
  async login(ctx) {
    const { account, password } = ctx.request.body;
    console.log(1);
     const sql =`db.collection("merchants").where({account:"${account}",password:"${password}"}).get()`
     const res = await DB.link("get", sql);  

     if(res.data.length==0) return new formatResponseData(ctx,null,'无此账号或密码错误',"",400).sendBody();
     const token = new Token().sign({ account, password });
     const id = res.data[0]._id;
     new formatResponseData(ctx,{token,id}).sendBody();
  }
  async register(ctx) {

    const { account, password} = ctx.request.body;
    //策略模式表单验证
    const checkRes = new FormCheck().add(account,"isEmpty").add(password,'isEmpty').check()
    if(!checkRes) return new formatResponseData(ctx,null,'不能为空').sendBody();
    const getSUser = `db.collection("merchants").where({account:"${account}",password:"${password}"}).get()`;
    const addSUser = `db.collection("merchants").add({data:[{account:"${account}",password:"${password}"}]})`
    //检验账号是否注册
    const res= await DB.link('get',getSUser);
    if(res.data.length!=0) return new formatResponseData(ctx,null,'账号已存在').sendBody();
    //账号注册
    const addRes= await DB.link("add", addSUser);
    new formatResponseData(ctx,{userId:addRes.data.id_list},'添加成功').sendBody()
  }
}

module.exports = new User();
const error = require('../model/error')
const getToken = require('../DB/database')
const formatData = require('../model/formatData')
class tmp {
    constructor(){
   
    }
   async test(ctx){
     new formatData(ctx,{a:1},"成功了").sendBody()
 
   }
}
module.exports= new tmp();
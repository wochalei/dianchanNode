const router = require('koa-router')();
const {get,add,updated} = require('../control/shopInfo');
const verifyToken = require('../middleware/verifyToken')
router.post('/shopInfo/get',get)
router.post('/shopInfo/add',add)
router.post('/shopInfo/updated',updated)
module.exports=router;
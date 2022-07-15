const router = require('koa-router')();
const {get,getDetails,accptStatus,accptOrder} = require('../control/order');
const verifyToken = require('../middleware/verifyToken')
router.post('/order/get',get)
router.post('/order/getDetails',getDetails)
router.post('/order/accptStatus',accptStatus)
router.post('/order/accptOrder',accptOrder)


module.exports=router;
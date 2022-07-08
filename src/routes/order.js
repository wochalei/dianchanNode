const router = require('koa-router')();
const {get,add,updated,deleted} = require('../control/order');
const verifyToken = require('../middleware/verifyToken')
router.post('/order/get',get)
router.post('/order/add',add)
router.post('/order/updated',updated)
router.post('/order/deleted',deleted)

module.exports=router;
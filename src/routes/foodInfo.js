const router = require('koa-router')();
const {get,add,updated,deleted} = require('../control/foodInfo');
const verifyToken = require('../middleware/verifyToken')
router.post('/foodInfo/get',get)
router.post('/foodInfo/add',add)
router.post('/foodInfo/updated',updated)
router.post('/foodInfo/deleted',deleted)

module.exports=router;
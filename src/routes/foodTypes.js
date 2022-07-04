const router = require('koa-router')();
const {get,add,updated,deleted} = require('../control/foodTypes');
const verifyToken = require('../middleware/verifyToken')
router.post('/foodTypes/get',get)
router.post('/foodTypes/add',add)
router.post('/foodTypes/updated',updated)
router.post('/foodTypes/deleted',deleted)

module.exports=router;
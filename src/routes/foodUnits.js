const router = require('koa-router')();
const {get,add,updated,deleted} = require('../control/foodUnits');
const verifyToken = require('../middleware/verifyToken')
router.post('/foodUnits/get',get)
router.post('/foodUnits/add',add)
router.post('/foodUnits/updated',updated)
router.post('/foodUnits/deleted',deleted)

module.exports=router;
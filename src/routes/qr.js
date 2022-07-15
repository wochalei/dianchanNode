const router = require('koa-router')();
const {get,add} = require('../control/qr');
const verifyToken = require('../middleware/verifyToken')
router.post('/qr/get',get)
router.post('/qr/add',add)



module.exports=router;
const router = require('koa-router')();
const upload = require('../middleware/uploadImg')
const DB = require('../DB/database')
const verifyToken = require('../middleware/verifyToken')
const uploadTcloud = require('../control/txCloud')
router.post('/uploads',upload.single('file'),uploadTcloud)

module.exports=router;
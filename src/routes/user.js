const router = require('koa-router')();
const {login,register} = require('../control/user');
const verifyToken = require('../middleware/verifyToken')
router.post('/login',login)
router.post('/register',register)
module.exports=router;
    

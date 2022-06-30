const router = require('koa-router')();
const {test} = require('../control/index');
router.get('/',test)

module.exports=router;
    

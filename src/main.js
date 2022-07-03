const app = require('./app/index')
const koaBody = require('koa-body')
const user = require('./routes/user')
const upload = require('./routes/upload')
const shopInfo = require('./routes/shopInfo')
const handError = require('./middleware/handlError')


app.use(koaBody())
app.use(handError)
app.use(user.routes())
app.use(upload.routes())
app.use(shopInfo.routes())
app.listen(3000)
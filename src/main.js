const app = require('./app/index')
const koaBody = require('koa-body')
const user = require('./routes/user')
const handError = require('./middleware/handlError')
app.use(koaBody({ multipart: true }))
app.use(handError)
app.use(user.routes())

app.listen(3000)
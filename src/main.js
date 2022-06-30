const app = require('./app/index')
const route = require('./routes/route')
const handError = require('./middleware/handlError')
app.use(handError)
app.use(route.routes())

app.listen(3000);
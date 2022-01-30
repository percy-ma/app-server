const koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const { tokenErrorHandler, auth } = require('./middleware/authorization')
const router = require('./routers')

const app = new koa();
app.use(cors())
app.use(bodyParser())

app.use((ctx, next) => tokenErrorHandler(ctx, next))
app.use(auth())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  console.log('3001 port is running!')
})
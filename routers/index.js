const Router = require('@koa/router')
const router = new Router({
  prefix: '/api/v1'
})

const user = require('./user')
const todo = require('./todo')

router.use(user.routes(), user.allowedMethods())
router.use(todo.routes(), todo.allowedMethods())

module.exports = router
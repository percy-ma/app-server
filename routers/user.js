const Router = require('@koa/router')
const router = new Router({
  prefix: '/user'
})
const auth = require('../controller/auth')

const routers = router
  .post('/login', auth.login)
  .post('/signup', auth.addUser)
  .post('/getUserByEmail', auth.getUserByEmail)
  .post('/getUserInfo', auth.getUserInfo)

module.exports = routers
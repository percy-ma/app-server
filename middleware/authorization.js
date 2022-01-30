const koajwt = require('koa-jwt')
const { token_key } = require('../utils/utils')


const tokenErrorHandler = (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get Access!'
    } else {
      throw err
    }
  })
}

const auth = () => {
  return koajwt({
    secret: token_key
  }).unless({
    path: ['/api/v1/user/login', '/api/v1/user/signup']
  })
}

module.exports = {
  tokenErrorHandler,
  auth
}

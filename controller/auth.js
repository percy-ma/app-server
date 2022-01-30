const UserService = require('../service/userService')
const { verifyPwd, encrypted, createToken, verifyToken } = require('../utils/utils')

module.exports = {
  // login
  login: async (ctx) => {
    const {
      email, password
    } = ctx.request.body
    if(!email || !password) {
      ctx.body = {
        status: 'error',
        msg: `The email and password can't be empty`
      }
      return
    }
    const user = await UserService.getUserByEmail(email)
    if(user !== null) {
      const encryPwd = user.getDataValue("password");
      const userInfo = {
        id: user.getDataValue("id"),
        username: user.getDataValue("username")
      }
      const flag = await verifyPwd(password, encryPwd)
      const token = createToken(userInfo)
      if(flag) {
        ctx.body = {
          result: 'SUCCESS',
          statusCode: 2000,
          msg: 'Login Succeed!',
          data: {
            userInfo,
            token
          }
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          statusCode: 4000,
          msg: 'Error'
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4001,
        msg: 'Please check the email'
      }
    }
  },

  // sign up
  addUser: async (ctx) => {
    const userObj = ctx.request.body;
    const user = await UserService.getUserByEmail(userObj.email)
    if(user !== null) {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4001,
        msg: 'The email already exist'
      }
    } else {
      userObj.password = await encrypted(userObj.password)
      const result = await UserService.createUser(userObj)
      if(result) {
        ctx.body = {
          result: 'SUCCESS',
          statusCode: 2000,
          msg: 'Sign up success'
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          statusCode: 4000,
          msg: 'Sign up failed'
        }
      }
    }
  },

  getUserInfo: async (ctx) => {
    let token = ctx.request.headers['authorization'];
    const tokenInfo = await verifyToken(token)
    const userId = tokenInfo.userInfo.id
    const userInfo = await UserService.getUserById(userId)
    const user = {
      id: userInfo.id,
      username: userInfo.username,
      email: userInfo.email
    }
    if(tokenInfo) {
      ctx.body = {
        result: 'SUCCESS',
        statusCode: 2000,
        msg: 'Login Success',
        data: {
          user
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4000,
        msg: 'Token expired'
      }
    }
  },

  getUserByEmail: async (ctx) => {
    const userObj = ctx.request.body;
    const user = await UserService.getUserByEmail(userObj.email)
    if(user !== null) {
      ctx.body = {
        result: 'SUCCESS',
        statusCode: 2000,
        msg: 'Success',
        data: user
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4000,
        msg: 'Email not exist'
      }
    }
  }
}
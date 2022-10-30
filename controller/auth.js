const UserService = require('../service/userService')
const { verifyPwd, encrypted, createToken, verifyToken, getRandomNum, toLower } = require('../utils/utils')

module.exports = {
  // login
  login: async (ctx) => {
    const {
      email, password
    } = ctx.request.body
    if(!email || !password) {
      ctx.body = {
        result: 'FAIL',
        code: 400,
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
      const tokenInfo = {
        token: createToken(userInfo, '6h'),
        expire_in: 6 * 60 * 60
      }
      if(flag) {
        ctx.body = {
          result: 'SUCCESS',
          code: 200,
          msg: 'Login Succeed!',
          data: {
            userInfo,
            tokenInfo
          }
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          code: 400,
          msg: 'Error'
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        code: 500,
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
        code: 500,
        msg: 'The email already exist'
      }
    } else {
      userObj.password = await encrypted(userObj.password)
      userObj.id = 'user'+ '-' + toLower(userObj.firstname) + toLower(userObj.lastname) + '-' + getRandomNum(4)
      const result = await UserService.createUser(userObj)
      if(result) {
        ctx.body = {
          result: 'SUCCESS',
          code: 200,
          msg: 'Sign up success'
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          code: 400,
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
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email
    }
    if(tokenInfo) {
      ctx.body = {
        result: 'SUCCESS',
        code: 200,
        msg: 'Login Success',
        data: {
          user
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        code: 400,
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
        code: 200,
        msg: 'Success',
        data: user
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        code: 400,
        msg: 'Email not exist'
      }
    }
  }
}
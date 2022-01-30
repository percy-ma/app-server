const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const token_key = 'Percyma'
const saltRound = 10

const createToken = (userInfo, timeout = '24h') => {
  const token_info = {
    userInfo,
    ctime: new Date().getTime()
  }
  const token = jwt.sign(token_info, token_key, { expiresIn: timeout })
  return token
}

const verifyToken = async old_token => {
  try {
    const userInfo = jwt.verify(old_token.split(' ')[1], token_key)
    return userInfo
  } catch (err) {
    return false
  }
}

// 密码加密
const encrypted = password => {
  return new Promise((resolve) => {
    bcrypt.genSalt(saltRound, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.log(err)
        }
        resolve(hash)
      })
    })
  })
}

// 密码验证
const verifyPwd = (password, fromDatabase) => {
  return new Promise((resolve) => {
    bcrypt.compare(password, fromDatabase, (err, res) => {
      if(err) {
        console.log(err)
      }
      resolve(res)
    })
  })
}

const getUserId = async (ctx) => {
  let token = ctx.request.headers['authorization'];
  const tokenInfo = await verifyToken(token);
  const userInfo = tokenInfo.userInfo;
  return userInfo.id
}

module.exports = {
  verifyToken,
  createToken,
  verifyPwd,
  encrypted,
  token_key,
  getUserId
}
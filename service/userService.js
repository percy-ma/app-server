const { User } = require('../model/user')
const { sequelize } = require('../database/connect')

class UserService {

  async getUserById(id) {
    return User.findOne({
      where: {
        id: id
      }
    })
  }

  async getUserByEmail(email) {
    return User.findOne({
      where: {
        email: email
      }
    })
  }

  async createUser(user) {
    return User.create(user)
  }

}

module.exports = new UserService()
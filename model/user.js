const { DataTypes, Model } = require('sequelize')
const moment = require('moment')
const { sequelize } = require('../database/connect')
const { getRandomNum } = require('../utils/utils')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: 'user_email_unique'
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  department: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user'
})

// User.sync({force: true})

module.exports = {
  User
}
const { DataTypes, Model } = require('sequelize')
const moment = require('moment')
const { sequelize } = require('../database/connect')
const { User } = require('./user')

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  done: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  expired_date: {
    type: DataTypes.DATE,
    allowNull: true
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
  modelName: 'todo',
  tableName: 'todo'
})

Todo.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id'
})

// Todo.sync({force: true})

module.exports = {
  Todo
}
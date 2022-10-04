const {Sequelize, DataTypes, Op} = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  post: config.port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00',
  define: {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
  // process.exit();
}).catch(err => {
  console.error('Unable to connect to database...', err)
})

module.exports = {
  sequelize,
  DataTypes,
  Op
};
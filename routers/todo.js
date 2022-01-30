const Router = require('@koa/router')
const router = new Router({
  prefix: '/todo'
})
const todo = require('../controller/todo')

const routers = router
  .get('/getTodoList', todo.getTodoList)
  .post('/addTodo', todo.addTodo)
  .post('/updateTodo', todo.updateTodo)
  .post('/deleteTodo', todo.deleteTodo)

module.exports = routers
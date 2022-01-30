const TodoService = require('../service/todoService')
const { verifyToken, getUserId } = require('../utils/utils')

module.exports = {
  // get Todo list
  getTodoList: async (ctx) => {
    let user_id = await getUserId(ctx);
    const list = await TodoService.getTodoList(user_id);
    ctx.body = {
      result: 'SUCCESS',
      statusCode: 2000,
      msg: 'Get List Success',
      data: list
    }
  },

  // add Todo
  addTodo: async (ctx) => {
    const item = ctx.request.body;
    item.user_id = await getUserId(ctx)
    const result = await TodoService.addTodo(item)
    if(result) {
      ctx.body = {
        result: 'SUCCESS',
        statusCode: 2000,
        msg: 'Add Todo Success'
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4000,
        msg: 'Add Todo Failed'
      }
    }
  },

  updateTodo: async (ctx) => {
    const data = ctx.request.body
    let user_id = await getUserId(ctx);
    const item = await TodoService.getTodoById(data.id, user_id)
    if(item) {
      const result = await TodoService.updateTodo(item.id, user_id, data)
      if(result[0] === 1) {
        ctx.body = {
          result: 'SUCCESS',
          statusCode: 2000,
          msg: 'Update Success'
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          statusCode: 4000,
          msg: 'Update Failed'
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4001,
        msg: 'Id not exist'
      }
    }
  },

  deleteTodo: async (ctx) => {
    const data = ctx.request.body
    let user_id = await getUserId(ctx);
    const item = await TodoService.getTodoById(data.id, user_id)
    if(item) {
      const result = await TodoService.deleteTodo(item.id, user_id)
      if(result === 1) {
        ctx.body = {
          result: 'SUCCESS',
          statusCode: 2000,
          msg: 'Delete Success'
        }
      } else {
        ctx.body = {
          result: 'FAIL',
          statusCode: 4000,
          msg: 'Delete Failed'
        }
      }
    } else {
      ctx.body = {
        result: 'FAIL',
        statusCode: 4001,
        msg: 'Id not exist'
      }
    }
  }
}
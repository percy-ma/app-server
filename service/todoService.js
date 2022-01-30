const { Todo } = require('../model/todo')

class TodoService {

  async getTodoList(userId) {
    return Todo.findAll({
      where: {
        user_id: userId
      }
    })
  }

  async getTodoById(id, userId) {
    return Todo.findOne({
      where: {
        id: id,
        user_id: userId
      }
    })
  }

  async addTodo(item) {
    return Todo.create(item)
  }

  async updateTodo(id, userId, data) {
    return Todo.update(data, {
      where: {
        id: id,
        user_id: userId
      }
    })
  }

  async deleteTodo(id, userId) {
    return Todo.destroy({
      where: {
        id: id,
        user_id: userId
      }
    })
  }

}

module.exports = new TodoService()
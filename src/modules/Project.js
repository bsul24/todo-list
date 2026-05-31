export default class Project {
  constructor(name) {
    this.id = crypto.randomUUID()
    this.name = name
    this.todos = []
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  removeTodo(todoId) {
    const todoIndex = this.todos.findIndex(el => el.id === todoId)
    if (todoIndex >= 0) {
      this.todos.splice(todoIndex, 1)
      return true
    } 
    return false
  }

  findTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId)
  }
}
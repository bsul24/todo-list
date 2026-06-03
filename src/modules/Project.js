import Todo from "./Todo.js"

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

  toggleTodoComplete(todoId) {
    this.findTodo(todoId)?.toggleComplete()
  }

  updateTodo(todoId, title, description, dueDate, priority) {
    this.findTodo(todoId)?.updateDetails(title, description, dueDate, priority)
  }

  static fromData(savedProject) {
    const newProject = new Project(savedProject.name)
    newProject.id = savedProject.id ? savedProject.id : crypto.randomUUID()
    newProject.todos = savedProject.todos ? savedProject.todos.map(todo => Todo.fromData(todo)) : []
    return newProject
  }
}
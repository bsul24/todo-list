export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  updateDetails(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  static fromData(savedTodo) {
    const newTodo = new Todo(
      savedTodo.title,
      savedTodo.description,
      savedTodo.dueDate,
      savedTodo.priority,
    );
    newTodo.id = savedTodo.id;
    newTodo.completed = savedTodo.completed;
    return newTodo;
  }
}

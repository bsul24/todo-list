import "./styles.css"
import Project from "./modules/Project.js"
import Todo from "./modules/Todo.js"

const proj = new Project("Test")
const todo1 = new Todo(
  "Test todo",
  "Testing todos and all that such",
  "2026-06-02",
  "High"
)
const todo2 = new Todo(
  "Another Test todo",
  "Testing more todos and all that such",
  "2026-06-05",
  "Medium"
)

proj.addTodo(todo1)
proj.addTodo(todo2)
console.log(proj)
proj.removeTodo(todo1.id)
console.log(proj)
console.log(proj.findTodo(todo2.id))
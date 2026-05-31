import "./styles.css"
import { getProjects, getCurrentProject, setCurrentProject, addProject, addTodoToCurrentProject, deleteTodoFromCurrentProject, findTodoInCurrentProject } from "./modules/appController.js"

// console.log(getProjects())
// console.log(getCurrentProject())
addTodoToCurrentProject(
  "Test Todo",
  "Testing todos and such yayayayayayay",
  "2026-06-13",
  "High" 
)
// console.log(getCurrentProject())
addProject("Test Project 1")
setCurrentProject(getProjects()[1].id)
// console.log(getCurrentProject())
const newTodo = addTodoToCurrentProject(
  "Another test todo",
  "Testing adding another todo to another new project",
  "2026-07-01",
  "Medium"
)
const todoId = newTodo.id
console.log(todoId)
console.log(getCurrentProject())
console.log(findTodoInCurrentProject(todoId))
deleteTodoFromCurrentProject(todoId)
console.log(getCurrentProject())

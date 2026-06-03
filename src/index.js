import "./styles.css"
import { setCurrentProject, addProject, addTodoToCurrentProject } from "./modules/appController.js"
import { render, initDOMEvents } from "./modules/domController.js"

const defaultProject = addProject("Default Project")
setCurrentProject(defaultProject.id)
addTodoToCurrentProject(
  "Default todo",
  "Testing out todos and such",
  "2026-06-05",
  "high"
)
const newProject = addProject("Test Project 1")
setCurrentProject(newProject.id)
addTodoToCurrentProject(
  "Test todo",
  "todo tests test todo all that and such ayayayayyaya",
  "2026-06-23",
  "low"
)
setCurrentProject(defaultProject.id)

initDOMEvents()
render()
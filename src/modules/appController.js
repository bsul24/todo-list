import Project from "./Project.js"
import Todo from "./Todo.js"

const projects = []
let currentProjectId = null

export function getProjects() {
  return projects
}

export function getCurrentProject() {
  return projects.find(proj => proj.id === currentProjectId)
}

export function setCurrentProject(projectId) {
  if (projects.some(proj => proj.id === projectId)) {
    currentProjectId = projectId
  }
}

export function addProject(name) {
  const newProject = new Project(name)
  projects.push(newProject)
  return newProject
}

export function deleteProject(projectId) {
  if (projects.length < 2) {
    return
  }

  const projectIndex = projects.findIndex(proj => proj.id === projectId)
  if (projectIndex >= 0) {
    projects.splice(projectIndex, 1)
    if (projectId === currentProjectId) {
      setCurrentProject(projects[0].id)
    }
    return true
  }
  return false
  
}

export function addTodoToCurrentProject(title, description, dueDate, priority) {
  const curProject = getCurrentProject()
  const newTodo = new Todo(title, description, dueDate, priority)
  curProject.addTodo(newTodo)
  return newTodo
}

export function deleteTodoFromCurrentProject(todoId) {
  const curProject = getCurrentProject()
  curProject.removeTodo(todoId)
}

export function findTodoInCurrentProject(todoId) {
  return getCurrentProject().findTodo(todoId)
}

export function toggleTodoCompleteInCurrentProject(todoId) {
  getCurrentProject().toggleTodoComplete(todoId)
}


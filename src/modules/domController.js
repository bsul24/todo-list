import { getProjects, getCurrentProject, setCurrentProject } from "./appController.js"

const projectsContainer = document.querySelector(".projects-container")
const currentProjectTitle = document.querySelector(".cur-proj-title")
const todosContainer = document.querySelector(".todos-container")

function renderProjects() {
  const projects = getProjects()
  const curProject = getCurrentProject()
  projectsContainer.textContent = ""
  projects.forEach(proj => {
    const html = `
      <button data-project-id="${proj.id}"${proj.id === curProject.id ? ' class="active-project"' : ""}>${proj.name}</button>
    `
    projectsContainer.innerHTML += html
  })
}

function renderCurrentProjectTitle() {
  const curProject = getCurrentProject()
  currentProjectTitle.textContent = curProject.name
}

function renderTodos() {
  const curProject = getCurrentProject()
  todosContainer.textContent = ""
  curProject.todos.forEach(todo => {
    const html = `
      <div class="todo-card" data-todo-id="${todo.id}">
        <h3 class="todo-title">${todo.title}</h3>
        <p class="todo-due-date">${todo.dueDate}</p>
        <p class="todo-priority">${todo.priority}</p>
        <p class="todo-status">${todo.completed ? "Completed" : "In Progress"}</p>
      </div>
    `
    todosContainer.innerHTML += html
  })
}

function handleProjectClick(e) {
  if (e.target.dataset.projectId) {
    setCurrentProject(e.target.dataset.projectId)
    render()
  }
}

export function render() {
  renderProjects()
  renderCurrentProjectTitle()
  renderTodos()
}

export function initDOMEvents() {
  projectsContainer.addEventListener("click", handleProjectClick)
}
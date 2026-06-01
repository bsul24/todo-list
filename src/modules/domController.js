import { getProjects, getCurrentProject, setCurrentProject, addTodoToCurrentProject, deleteTodoFromCurrentProject, toggleTodoCompleteInCurrentProject } from "./appController.js"

const projectsContainer = document.querySelector(".projects-container")
const currentProjectTitle = document.querySelector(".cur-proj-title")
const todosContainer = document.querySelector(".todos-container")
const newTodoBtn = document.querySelector(".new-todo-btn")
const todosFormContainer = document.querySelector(".todos-form-container")

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
        <input class="todo-complete-checkbox" type="checkbox" ${todo.completed ? "checked" : ""}>
        <button class="delete-todo-btn" type="button">Delete</button>
      </div>
    `
    todosContainer.innerHTML += html
  })
}

function handleNewTodoClick() {
  todosFormContainer.innerHTML = `
    <form action="" class="new-todo-form">
      <label for="title">Title</label>
      <input type="text" name="title" id="title" required>
      <label for="description">Description</label>
      <textarea name="description" id="description" required></textarea>
      <label for="due-date">Due Date</label>
      <input type="date" name="due-date" id="due-date" required>
      <label for="priority">Priority</label>
      <select name="priority" id="priority">
        <option value="low" selected>Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button class="submit-todo-btn" type="submit">Submit</button>
      <button class="cancel-todo-btn" type="button">Cancel</button>
    </form>
  `
}

function handleFormSubmit(e) {
  e.preventDefault()
  const form = e.target
  const formData = new FormData(form)
  const title = formData.get("title")
  const description = formData.get("description")
  const dueDate = formData.get("due-date")
  const priority = formData.get("priority")
  todosFormContainer.textContent = ""
  addTodoToCurrentProject(title, description, dueDate, priority)
  render()
}

function handleProjectClick(e) {
  if (e.target.dataset.projectId) {
    setCurrentProject(e.target.dataset.projectId)
    render()
  }
}

function handleTodoFormCancel(e) {
  if (e.target.classList.contains("cancel-todo-btn")) {
    todosFormContainer.textContent = ""
  }
}

function handleTodoDeleteClick(e) {
  if (e.target.classList.contains("delete-todo-btn")) {
    deleteTodoFromCurrentProject(e.target.closest(".todo-card").dataset.todoId)
    render()
  }
}

function handleTodoCheckboxClick(e) {
  if (e.target.classList.contains("todo-complete-checkbox")) {
    toggleTodoCompleteInCurrentProject(e.target.closest(".todo-card").dataset.todoId)
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
  newTodoBtn.addEventListener("click", handleNewTodoClick)
  todosFormContainer.addEventListener("submit", handleFormSubmit)
  todosFormContainer.addEventListener("click", handleTodoFormCancel)
  todosContainer.addEventListener("click", handleTodoDeleteClick)
  todosContainer.addEventListener("click", handleTodoCheckboxClick)
}
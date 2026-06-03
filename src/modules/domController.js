import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  addTodoToCurrentProject,
  deleteTodoFromCurrentProject,
  toggleTodoCompleteInCurrentProject,
  addProject,
  deleteProject,
  updateTodoInCurrentProject,
} from "./appController.js";
import { format, parseISO, isBefore, startOfToday } from "date-fns";

const projectsContainer = document.querySelector(".projects-container");
const currentProjectTitle = document.querySelector(".cur-proj-title");
const todosContainer = document.querySelector(".todos-container");
const newTodoBtn = document.querySelector(".new-todo-btn");
const todosFormContainer = document.querySelector(".todos-form-container");
const newProjectBtn = document.querySelector(".new-proj-btn");
const projectFormContainer = document.querySelector(".project-form-container");
let expandedTodoId = null;
let editingTodoId = null;
let confirmingDeleteTodoId = null;
let confirmingDeleteProjectId = null;

function renderProjects() {
  const projects = getProjects();
  const curProject = getCurrentProject();
  projectsContainer.textContent = "";
  projects.forEach((proj) => {
    const html = `
      <div class="project-item ${proj.id === curProject.id ? "active-project" : ""}" data-project-id="${proj.id}">
        <button class="project-select-btn" type="button">${proj.name}</button>
        ${
          confirmingDeleteProjectId === proj.id
            ? `
            <p class="confirm-delete-project-text">Delete this project?</p>
            <button class="confirm-delete-project-btn" type="button">Yes</button>
            <button class="cancel-delete-project-btn" type="button">Cancel</button>
          `
            : projects.length > 1
              ? `<button class="project-delete-btn" type="button">Delete</button>`
              : ""
        }
      </div>
    `;
    projectsContainer.innerHTML += html;
  });
}

function renderCurrentProjectTitle() {
  const curProject = getCurrentProject();
  currentProjectTitle.textContent = curProject.name;
}

function renderTodos() {
  const curProject = getCurrentProject();
  if (curProject.todos.length === 0) {
    todosContainer.innerHTML = `
      <div class="empty-state">
        <h3>No todos yet</h3>
        <p>Create a todo to get started.</p>
      </div>
    `;
    return;
  }
  todosContainer.textContent = "";
  curProject.todos.forEach((todo) => {
    const html =
      editingTodoId === todo.id
        ? `
    <div class="todo-card ${
      todo.priority === "low"
        ? "low-priority"
        : todo.priority === "medium"
          ? "medium-priority"
          : "high-priority"
    }" data-todo-id="${todo.id}">
        <form action="" class="edit-todo-form">
          <label for="new-title">Title</label>
          <input type="text" name="new-title" id="new-title" value="${todo.title}" required>
          <label for="new-description">Description</label>
          <textarea name="new-description" id="new-description" required>${todo.description}</textarea>
          <label for="new-due-date">Due Date</label>
          <input type="date" name="new-due-date" id="new-due-date" value="${todo.dueDate}" required>
          <label for="new-priority">Priority</label>
          <select name="new-priority" id="new-priority">
            <option value="low" ${todo.priority === "low" ? "selected" : ""}>Low</option>
            <option value="medium" ${todo.priority === "medium" ? "selected" : ""}>Medium</option>
            <option value="high" ${todo.priority === "high" ? "selected" : ""}>High</option>
          </select>
          <button class="submit-update-todo-btn" type="submit">Submit</button>
          <button class="cancel-update-todo-btn" type="button">Cancel</button>
        </form>
      </div>
    `
        : `
      <div class="todo-card ${
        todo.priority === "low"
          ? "low-priority"
          : todo.priority === "medium"
            ? "medium-priority"
            : "high-priority"
      } ${todo.completed ? "completed" : ""}" data-todo-id="${todo.id}">
        <h3 class="todo-title">${todo.title}</h3>
        ${expandedTodoId === todo.id ? `<p class="todo-description">${todo.description}</p>` : ""}
        <p class="todo-due-date ${isOverdue(todo) ? "overdue" : ""}">${formatDueDate(todo.dueDate)}</p>
        <p class="todo-status">${todo.completed ? "Completed" : "In Progress"}</p> 
        <input class="todo-complete-checkbox" type="checkbox" aria-label="Mark todo complete" ${todo.completed ? "checked" : ""}>
        <button class="todo-details-btn" type="button">${todo.id === expandedTodoId ? "Hide Details" : "Details"}</button>
        ${
          confirmingDeleteTodoId === todo.id
            ? `
            <p class="confirm-delete-todo-text">Are you sure?</p>
            <button class="confirm-delete-todo-btn" type="button">Yes, delete</button>
            <button class="cancel-delete-todo-btn" type="button">Cancel</button>
          `
            : expandedTodoId === todo.id
              ? `<button class="delete-todo-btn" type="button">Delete</button>`
              : ""
        }
        ${expandedTodoId === todo.id && confirmingDeleteTodoId !== todo.id ? `<button class="edit-todo-btn" type="button">Edit</button>` : ""}
      </div>
    `;
    todosContainer.innerHTML += html;
  });
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
  `;
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const title = formData.get("title");
  const description = formData.get("description");
  const dueDate = formData.get("due-date");
  const priority = formData.get("priority");
  todosFormContainer.textContent = "";
  addTodoToCurrentProject(title, description, dueDate, priority);
  expandedTodoId = null;
  editingTodoId = null;
  confirmingDeleteTodoId = null;
  confirmingDeleteProjectId = null;
  render();
}

function handleNewProjectClick() {
  projectFormContainer.innerHTML = `
    <form action="" class="new-project-form">
      <label for="project-name">Project Name</label>
      <input type="text" name="project-name" id="project-name" required>
      <button class="submit-project-btn" type="submit">Submit</button>
      <button class="cancel-project-btn" type="button">Cancel</button>
    </form>
  `;
}

function handleNewProjectFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const projectName = formData.get("project-name");
  projectFormContainer.textContent = "";
  setCurrentProject(addProject(projectName).id);
  expandedTodoId = null;
  editingTodoId = null;
  confirmingDeleteTodoId = null;
  confirmingDeleteProjectId = null;
  render();
}

function handleProjectFormCancel(e) {
  if (e.target.classList.contains("cancel-project-btn")) {
    projectFormContainer.textContent = "";
  }
}

function handleProjectClick(e) {
  if (e.target.classList.contains("project-select-btn")) {
    setCurrentProject(e.target.closest(".project-item").dataset.projectId);
    expandedTodoId = null;
    editingTodoId = null;
    confirmingDeleteTodoId = null;
    confirmingDeleteProjectId = null;
    render();
  } else if (e.target.classList.contains("project-delete-btn")) {
    const curProjectId = e.target.closest(".project-item").dataset.projectId;
    confirmingDeleteProjectId = curProjectId;
    render();
  } else if (e.target.classList.contains("confirm-delete-project-btn")) {
    const curProjectId = e.target.closest(".project-item").dataset.projectId;
    deleteProject(curProjectId);
    confirmingDeleteProjectId = null;
    expandedTodoId = null;
    editingTodoId = null;
    confirmingDeleteTodoId = null;
    render();
  } else if (e.target.classList.contains("cancel-delete-project-btn")) {
    confirmingDeleteProjectId = null;
    render();
  }
}

function handleTodoFormCancel(e) {
  if (e.target.classList.contains("cancel-todo-btn")) {
    todosFormContainer.textContent = "";
  }
}

function handleTodoClick(e) {
  if (e.target.classList.contains("delete-todo-btn")) {
    const curTodoId = e.target.closest(".todo-card").dataset.todoId;
    confirmingDeleteTodoId = curTodoId;
    render();
  } else if (e.target.classList.contains("todo-complete-checkbox")) {
    toggleTodoCompleteInCurrentProject(
      e.target.closest(".todo-card").dataset.todoId,
    );
    confirmingDeleteTodoId = null;
    render();
  } else if (e.target.classList.contains("todo-details-btn")) {
    if (e.target.closest(".todo-card").dataset.todoId === expandedTodoId) {
      expandedTodoId = null;
      editingTodoId = null;
      confirmingDeleteTodoId = null;
      confirmingDeleteProjectId = null;
    } else {
      expandedTodoId = e.target.closest(".todo-card").dataset.todoId;
      confirmingDeleteTodoId = null;
      confirmingDeleteProjectId = null;
    }
    render();
  } else if (e.target.classList.contains("edit-todo-btn")) {
    editingTodoId = expandedTodoId;
    confirmingDeleteProjectId = null;
    confirmingDeleteTodoId = null;
    render();
  } else if (e.target.classList.contains("cancel-update-todo-btn")) {
    editingTodoId = null;
    render();
  } else if (e.target.classList.contains("confirm-delete-todo-btn")) {
    const curTodoId = e.target.closest(".todo-card").dataset.todoId;
    deleteTodoFromCurrentProject(curTodoId);
    confirmingDeleteTodoId = null;
    expandedTodoId = null;
    editingTodoId = null;
    confirmingDeleteProjectId = null;
    render();
  } else if (e.target.classList.contains("cancel-delete-todo-btn")) {
    confirmingDeleteTodoId = null;
    confirmingDeleteProjectId = null;
    render();
  }
}

function handleEditTodoSubmit(e) {
  if (!e.target.classList.contains("edit-todo-form")) {
    return;
  }

  e.preventDefault();
  const curTodoId = e.target.closest(".todo-card").dataset.todoId;
  const form = e.target;
  const formData = new FormData(form);
  const title = formData.get("new-title");
  const description = formData.get("new-description");
  const dueDate = formData.get("new-due-date");
  const priority = formData.get("new-priority");
  updateTodoInCurrentProject(curTodoId, title, description, dueDate, priority);
  editingTodoId = null;
  render();
}

function formatDueDate(dueDate) {
  if (!dueDate) {
    return "";
  }
  const date = parseISO(dueDate);
  return format(date, "MMM d, yyyy");
}

function isOverdue(todo) {
  if (!todo.dueDate || todo.completed) {
    return false;
  }

  return isBefore(parseISO(todo.dueDate), startOfToday());
}

export function render() {
  renderProjects();
  renderCurrentProjectTitle();
  renderTodos();
}

export function initDOMEvents() {
  projectsContainer.addEventListener("click", handleProjectClick);
  newTodoBtn.addEventListener("click", handleNewTodoClick);
  todosFormContainer.addEventListener("submit", handleFormSubmit);
  todosFormContainer.addEventListener("click", handleTodoFormCancel);
  todosContainer.addEventListener("click", handleTodoClick);
  todosContainer.addEventListener("submit", handleEditTodoSubmit);
  newProjectBtn.addEventListener("click", handleNewProjectClick);
  projectFormContainer.addEventListener("submit", handleNewProjectFormSubmit);
  projectFormContainer.addEventListener("click", handleProjectFormCancel);
}

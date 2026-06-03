import Project from "./Project.js";
import Todo from "./Todo.js";
import { saveProjects, loadProjects } from "./storage.js";

let projects = [];
let currentProjectId = null;

export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return projects.find((proj) => proj.id === currentProjectId);
}

export function setCurrentProject(projectId) {
  if (projects.some((proj) => proj.id === projectId)) {
    currentProjectId = projectId;
  }
}

export function addProject(name) {
  const newProject = new Project(name);
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function deleteProject(projectId) {
  if (projects.length < 2) {
    return;
  }

  const projectIndex = projects.findIndex((proj) => proj.id === projectId);
  if (projectIndex >= 0) {
    projects.splice(projectIndex, 1);
    if (projectId === currentProjectId) {
      setCurrentProject(projects[0].id);
    }
    saveProjects(projects);
    return true;
  }
  return false;
}

export function addTodoToCurrentProject(title, description, dueDate, priority) {
  const curProject = getCurrentProject();
  const newTodo = new Todo(title, description, dueDate, priority);
  curProject.addTodo(newTodo);
  saveProjects(projects);
  return newTodo;
}

export function deleteTodoFromCurrentProject(todoId) {
  const curProject = getCurrentProject();
  curProject.removeTodo(todoId);
  saveProjects(projects);
}

export function findTodoInCurrentProject(todoId) {
  return getCurrentProject().findTodo(todoId);
}

export function toggleTodoCompleteInCurrentProject(todoId) {
  getCurrentProject().toggleTodoComplete(todoId);
  saveProjects(projects);
}

export function updateTodoInCurrentProject(
  todoId,
  title,
  description,
  dueDate,
  priority,
) {
  getCurrentProject().updateTodo(todoId, title, description, dueDate, priority);
  saveProjects(projects);
}

export function initializeApp() {
  const savedProjects = loadProjects();
  if (savedProjects.length > 0) {
    projects = savedProjects.map((project) => Project.fromData(project));
  } else {
    projects.push(Project.fromData({ name: "Default Project" }));
    saveProjects(projects);
  }

  currentProjectId = projects[0].id;
}

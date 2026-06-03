export function saveProjects(projects) {
  const strProjects = JSON.stringify(projects)
  localStorage.setItem("todoProjects", strProjects)
}

export function loadProjects() {
  const projects = localStorage.getItem("todoProjects")
  if (!projects || projects === "undefined") {
    return []
  }

  const parsedProjects = JSON.parse(projects)
  return parsedProjects ? parsedProjects : []
}
# Todo List

A responsive todo list app built with JavaScript, Webpack, and localStorage as part of The Odin Project curriculum. Users can create projects, add todos, edit todo details, mark tasks complete, and organize todos by project.

The app stores projects and todos in `localStorage`, so changes persist after refreshing the page. It also uses `date-fns` to format due dates and highlight overdue tasks.

## Features

- Create and delete projects
- Prevent deleting the final remaining project
- Create, edit, and delete todos
- Confirm before deleting todos or projects
- Mark todos as complete or incomplete
- Expand todos to view more details
- Organize todos by project
- Format due dates with `date-fns`
- Highlight overdue incomplete todos
- Show an empty-state message when a project has no todos
- Save projects and todos with `localStorage`
- Responsive layout for desktop and mobile screens

## Built With

- HTML
- CSS
- JavaScript
- Webpack
- date-fns
- ESLint
- Prettier
- localStorage

## What I Practiced

- Separating application logic from DOM logic
- Organizing code into focused modules
- Creating and managing objects with JavaScript classes
- Rebuilding class instances from saved JSON data
- Managing app state across projects and todos
- Rendering dynamic DOM content
- Handling form submissions and user input
- Using event delegation for dynamic elements
- Persisting data with the Web Storage API
- Formatting and comparing dates with `date-fns`
- Building a responsive layout with CSS Grid and Flexbox

## Project Structure

```txt
src/
  modules/
    Project.js
    Todo.js
    appController.js
    domController.js
    storage.js
  index.js
  styles.css
  template.html
```

## Local Storage Note

This project stores todo data in the browser using `localStorage`.

Because `localStorage` stores data as JSON, saved projects and todos are loaded back as plain objects. The app rebuilds them into `Project` and `Todo` instances when it initializes so class methods continue to work after refreshing the page.

## Installation

Clone the repository:

```bash
git clone https://github.com/bsul24/todo-list.git
cd todo-list
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting and formatting checks:

```bash
npm run lint
npm run format:check
```

## Live Demo

[View the live app](https://getitdone-todos.netlify.app/)

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/)
- [date-fns](https://date-fns.org/)

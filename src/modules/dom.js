import AppController from "./appController";

const DOMController = (() => {
  const projectsList = document.querySelector("#projects-list");
  const projectTitle = document.querySelector("#project-title");
  const todosList = document.querySelector("#todos-list");

  const renderProjects = () => {
    projectsList.innerHTML = "";

    const projects = AppController.getProjects();
    const activeProject = AppController.getActiveProject();

    projects.forEach((project) => {
      const projectButton = document.createElement("button");

      projectButton.classList.add("project-item");
      projectButton.textContent = project.name;
      projectButton.dataset.projectId = project.id;

      if (activeProject && project.id === activeProject.id) {
        projectButton.classList.add("active");
      }

      projectsList.appendChild(projectButton);
    });
  };

  const renderProjectTitle = () => {
    const activeProject = AppController.getActiveProject();

    if (!activeProject) {
      projectTitle.textContent = "No project selected";
      return;
    }

    projectTitle.textContent = activeProject.name;
  };

  const renderTodos = () => {
    todosList.innerHTML = "";

    const activeProject = AppController.getActiveProject();

    if (!activeProject) return;

    activeProject.todos.forEach((todo) => {
      const todoCard = document.createElement("div");
      todoCard.classList.add("todo-card");

      todoCard.innerHTML = `
        <input type="checkbox" ${todo.completed ? "checked" : ""} />
        <div>
          <h3>${todo.title}</h3>
          <p>${todo.description}</p>
        </div>
        <span>${todo.dueDate}</span>
      `;

      todosList.appendChild(todoCard);
    });
  };

  const render = () => {
    renderProjects();
    renderProjectTitle();
    renderTodos();
  };

  return {
    render,
  };
})();

export default DOMController;

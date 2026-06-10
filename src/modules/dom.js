import AppController from "./appController";

const DOMController = (() => {
  const projectsList = document.querySelector("#projects-list");
  const projectTitle = document.querySelector("#project-title");
  const todosList = document.querySelector("#todos-list");
  const projectForm = document.querySelector("#project-form");
  const projectNameInput = document.querySelector("#project-name-input");
  const newProjectBtn = document.querySelector("#new-project-btn");
  const newTodoBtn = document.querySelector("#new-todo-btn");
  const todoForm = document.querySelector("#todo-form");
  const todoTitleInput = document.querySelector("#todo-title-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input",
  );
  const todoDateInput = document.querySelector("#todo-date-input");
  const todoPriorityInput = document.querySelector("#todo-priority-input");

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

      projectButton.addEventListener("click", () => {
        AppController.setActiveProject(project.id);
        render();
      });

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
        <input 
            type="checkbox" 
            class="todo-checkbox" 
            data-todo-id="${todo.id}" 
            ${todo.completed ? "checked" : ""} 
        />

        <div>
            <h3>${todo.title}</h3>
            <p>${todo.description}</p>
        </div>

        <span>${todo.dueDate}</span>

        <button class="delete-todo-btn" data-todo-id="${todo.id}">
            Delete
        </button>
        `;
      const checkbox = todoCard.querySelector(".todo-checkbox");
      const deleteBtn = todoCard.querySelector(".delete-todo-btn");

      checkbox.addEventListener("change", () => {
        AppController.toggleTodo(todo.id);

        render();
      });

      deleteBtn.addEventListener("click", () => {
        AppController.deleteTodo(todo.id);
        render();
      });

      todosList.appendChild(todoCard);
    });
  };

  const bindEvents = () => {
    newProjectBtn.addEventListener("click", () => {
      projectForm.classList.toggle("hidden");
    });

    projectForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const projectName = projectNameInput.value.trim();

      if (!projectName) return;

      const project = AppController.createProject(projectName);

      AppController.setActiveProject(project.id);

      render();

      projectForm.reset();
      projectForm.classList.add("hidden");
    });

    newTodoBtn.addEventListener("click", () => {
      todoForm.classList.toggle("hidden");
    });

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = todoTitleInput.value.trim();
      const description = todoDescriptionInput.value.trim();
      const dueDate = todoDateInput.value;
      const priority = todoPriorityInput.value;

      if (!title) return;

      AppController.createTodo(title, description, dueDate, priority);

      render();

      todoForm.reset();
      todoForm.classList.add("hidden");
    });
  };
  const render = () => {
    renderProjects();
    renderProjectTitle();
    renderTodos();
  };

  return {
    render,
    bindEvents,
  };
})();

export default DOMController;

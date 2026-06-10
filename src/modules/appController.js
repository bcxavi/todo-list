import Project from "./project";
import Todo from "./todo";

const AppController = (() => {
  const projects = [];
  let activeProjectId = null;

  const createDefaultProject = () => {
    const defaultProject = new Project("Default");

    projects.push(defaultProject);
    activeProjectId = defaultProject.id;
  };

  const getProjects = () => projects;

  const getActiveProject = () => {
    return projects.find((project) => project.id === activeProjectId);
  };

  const setActiveProject = (projectId) => {
    activeProjectId = projectId;
  };

  const createProject = (name) => {
    const project = new Project(name);

    projects.push(project);

    return project;
  };

  const deleteProject = (projectId) => {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId,
    );

    if (projectIndex === -1) return;

    projects.splice(projectIndex, 1);

    if (activeProjectId === projectId) {
      activeProjectId = projects[0]?.id || null;
    }
  };

  const createTodo = (title, description, dueDate, priority) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    const todo = new Todo(title, description, dueDate, priority);

    activeProject.addTodo(todo);

    return todo;
  };

  const deleteTodo = (todoId) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    activeProject.removeTodo(todoId);
  };

  const toggleTodo = (todoId) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    const todo = activeProject.getTodo(todoId);

    if (!todo) return;

    todo.toggleCompleted();
  };

  createDefaultProject();

  return {
    getProjects,
    getActiveProject,
    setActiveProject,
    createProject,
    deleteProject,
    createTodo,
    deleteTodo,
    toggleTodo,
  };
})();

export default AppController;

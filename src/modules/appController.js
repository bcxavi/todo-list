import Project from "./project";
import Todo from "./todo";
import { saveData, loadData } from "./storage";

const AppController = (() => {
  const projects = [];
  let activeProjectId = null;

  const save = () => {
    saveData({
      projects,
      activeProjectId,
    });
  };

  const createDefaultProject = () => {
    const defaultProject = new Project("Default");

    projects.push(defaultProject);
    activeProjectId = defaultProject.id;

    save();
  };

  const getProjects = () => projects;

  const getActiveProject = () => {
    return projects.find((project) => project.id === activeProjectId);
  };

  const setActiveProject = (projectId) => {
    activeProjectId = projectId;
    save();
  };

  const createProject = (name) => {
    const project = new Project(name);

    projects.push(project);

    save();

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
    save();
  };

  const createTodo = (title, description, dueDate, priority) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    const todo = new Todo(title, description, dueDate, priority);

    activeProject.addTodo(todo);
    save();

    return todo;
  };

  const deleteTodo = (todoId) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    activeProject.removeTodo(todoId);
    save();
  };

  const toggleTodo = (todoId) => {
    const activeProject = getActiveProject();

    if (!activeProject) return;

    const todo = activeProject.getTodo(todoId);

    if (!todo) return;

    todo.toggleCompleted();
    save();
  };

  const init = () => {
    const savedData = loadData();

    if (savedData) {
      savedData.projects.forEach((projectData) => {
        projects.push(Project.fromData(projectData));
      });

      activeProjectId = savedData.activeProjectId;

      return;
    }

    createDefaultProject();
  };

  init();

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

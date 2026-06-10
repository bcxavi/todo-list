import "./styles.css";
import AppController from "./modules/appController";
import DOMController from "./modules/dom";

const workProject = AppController.createProject("Trabajo");
AppController.setActiveProject(workProject.id);

AppController.createTodo(
  "Revisar emails",
  "Responder mensajes importantes",
  "2026-06-12",
  "medium",
);

AppController.setActiveProject(AppController.getProjects()[0].id);

DOMController.render();
DOMController.bindEvents();

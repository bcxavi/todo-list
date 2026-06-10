import "./styles.css";
import AppController from "./modules/appController";

console.log(AppController.getProjects());

AppController.createProject("Trabajo");

console.log(AppController.getProjects());

AppController.createTodo(
  "Estudiar módulos",
  "Repasar import/export",
  "2026-06-15",
  "high",
);

console.log(AppController.getActiveProject());

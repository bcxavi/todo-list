import "./styles.css";
import AppController from "./modules/appController";
import DOMController from "./modules/dom";

AppController.createTodo(
  "Estudiar DOM",
  "Renderizar proyectos y todos desde JavaScript",
  "2026-06-15",
  "high",
);

AppController.createTodo(
  "Preparar café",
  "Importante para programar con dignidad",
  "2026-06-11",
  "medium",
);

DOMController.render();

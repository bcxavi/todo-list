import Todo from "./todo";

export default class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  updateName(newName) {
    this.name = newName;
  }
  static fromData(data) {
    const project = new Project(data.name);

    project.id = data.id;
    project.todos = data.todos.map((todo) => Todo.fromData(todo));

    return project;
  }
}

export default class Todo {
  constructor(title, description, dueDate, priority) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  static fromData(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
    );

    todo.id = data.id;
    todo.completed = data.completed;

    return todo;
  }
}

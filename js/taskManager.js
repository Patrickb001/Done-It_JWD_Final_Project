class TaskManager {
  constructor(currentId) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(dataObject) {
    dataObject.id = this.currentId;
    this.tasks.push(dataObject);
    console.log(this.tasks);
    this.currentId++;
  }

  clearInput(event) {
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    event.target[4].value = "";
  }
}

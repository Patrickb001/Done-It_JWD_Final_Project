class TaskManager {
  parentElement = document.querySelector(".task-container");
  constructor(currentId) {
    this.tasks = [];
    this.currentId = currentId;
    this.tasksHtmlList = [];
  }

  addTask(dataObject) {
    dataObject.id = this.currentId;
    this.tasks.push(dataObject);
    this.createTaskHtml(dataObject);
    this.currentId++;
  }

  clearInput(event) {
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    event.target[4].value = "";
  }

  createTaskHtml(dataObject) {
    let status = this.handleStatus(dataObject.projectStatus);
    let date = new Date(dataObject.dueDate);
    let dateString = `${
      date.getMonth() + 1
    }-${date.getUTCDate()}-${date.getFullYear()} `;

    let taskHtml = `
    <ul data-task-id=${dataObject.id} class="list-group list-group-horizontal m-2">
      <li class="w-20 list-group-item">${dataObject.description}</li>
      <li class="w-20 list-group-item bg-success text-white"> ${dataObject.assignedTo}</li>
      <li class="w-20 list-group-item bg-success text-white"> ${dataObject.projectName}</li>
      <li class="w-20 list-group-item bg-success text-white"> ${dateString}</li>
      <div class="progress w-20">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="${status}"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: ${status}%"
          >
          ${status}%
        </div>
       </div>
       <button class="disabled btn btn-danger ml-2">X</button>
      </ul>
    `;
    this.tasksHtmlList.push(taskHtml);

    this.parentElement.insertAdjacentHTML("beforeend", taskHtml);
  }

  getTaskById(taskId, taskValue) {
    let foundTask;
    this.tasks.forEach((task) => {
      if (task.id === taskId) {
        foundTask = task;
      }
    });
    foundTask.projectStatus = taskValue;
    return foundTask;
  }

  handleStatus(projectStatus) {
    if (projectStatus === "todo") {
      projectStatus = `25`;
    } else if (projectStatus === "in-progress") {
      projectStatus = `50`;
    } else if (projectStatus === "review") {
      projectStatus = `75`;
    } else {
      projectStatus = `100`;
    }
    return projectStatus;
  }
}

const taskManager = new TaskManager(0);
let form = document.querySelector("form");

form.addEventListener("submit", validateForm);

function validateForm(e) {
  e.preventDefault();
  let entries = [
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    e.target[3].value,
    e.target[4].value,
  ];
  let isValidEntries = entries.every((entry) => entry.trim() !== "");

  entries.forEach((_, index) => {
    if (entries[index].trim() === "") {
      e.target[index].classList.add("invalid");
    } else {
      e.target[index].classList.remove("invalid");
    }
  });

  if (isValidEntries) {
    let dataObject = {
      projectName: entries[0],
      description: entries[1],
      projectStatus: entries[2],
      assignedTo: entries[3],
      dueDate: entries[4],
    };
    taskManager.addTask(dataObject);
    taskManager.clearInput(e);
  }
}

document.querySelector(".task-container").addEventListener("dblclick", (e) => {
  let taskStatus = e.target.closest(".progress");
  if (taskStatus == null) return;
  if (e.target.closest(".progress") === taskStatus) {
    let dropdown = addDropdown();
    taskStatus.innerHTML = dropdown;
    if (taskStatus.innerHTML === dropdown) {
      taskStatus.addEventListener("input", (e) => {
        [taskStatus.innerHTML, taskValue] = dropdownStatus(e.target.value);
        let taskItem = taskStatus.closest(".list-group");
        let taskId = +taskStatus.closest(".list-group").dataset.taskId;
        taskManager.getTaskById(taskId, e.target.value);
        e.target.value === "done"
          ? enableButton(taskItem)
          : disableButton(taskItem);
      });
    }
  }
});

function addDropdown() {
  return `
  <select class="form-select">
      <option value="">Please select an option</option>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="review">Review</option>
      <option value="done">Done</option>
    </select>
  `;
}

function dropdownStatus(taskValue) {
  if (taskValue === "todo") {
    taskValue = `25`;
  } else if (taskValue === "in-progress") {
    taskValue = `50`;
  } else if (taskValue === "review") {
    taskValue = `75`;
  } else {
    taskValue = `100`;
  }
  // if (taskValue === `100`) return;
  // Add functionality to gray out button and add it back once taskValue === 100%
  return [
    `<div
    class="progress-bar"
    role="progressbar"
    aria-valuenow="${taskValue}"
    aria-valuemin="0"
    aria-valuemax="100"
    style="width: ${taskValue}%"
    >
    ${taskValue}%
  </div>`,
    taskValue,
  ];
}

function enableButton(taskItem) {
  let btn = taskItem.querySelector(".btn");
  btn.classList.remove("disabled");
}
function disableButton(taskItem) {
  let btn = taskItem.querySelector(".btn");
  btn.classList.add("disabled");
}

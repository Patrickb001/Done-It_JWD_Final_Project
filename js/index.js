const taskManager = new TaskManager(0);
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let entries = [
    e.target[0].value,
    e.target[1].value,
    e.target[2].value,
    e.target[3].value,
    e.target[4].value,
  ];
  let isValidEntries = entries.every((entry) => entry.trim() !== "");
  console.log(isValidEntries);

  entries.forEach((entry, index) => {
    if (entries[index].trim() === "") {
      e.target[index].classList.add("invalid");
    } else {
      e.target[index].classList.remove("invalid");
    }
  });

  if (isValidEntries) {
    entries.forEach((entry, index) => {
      e.target[index].classList.remove("invalid");
    });

    let dataObject = {
      projectName: e.target[0].value,
      description: e.target[1].value,
      projectStatus: e.target[2].value,
      assignedTo: e.target[3].value,
      dueDate: e.target[4].value,
    };
    taskManager.addTask(dataObject);
    taskManager.clearInput(e);
  }
});

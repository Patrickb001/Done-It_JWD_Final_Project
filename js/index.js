const taskManager = new TaskManager(0);
let form = document.querySelector("form");
let lists = document.querySelectorAll(".list-group");

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
});

// lists.forEach((list) => {
//   list.addEventListener("click", (e) => {
//     console.log(e.target.closest(".progress"));
//   });
// });

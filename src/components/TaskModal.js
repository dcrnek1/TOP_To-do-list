import modal from "../scripts/modal";
import Folder, { foldersDOM } from "../scripts/folders";
import state from "../scripts/state";
import { tasksDOM } from "../scripts/tasks";

export default function newTaskModal() {
  const parser = new DOMParser();
  const html = `<div class="simple-form">
    <div class="form-field">
        <label>Desc:</label>
        <input type="test" id='task-desc' autofocus autocomplete="off" required></input>
    </div>
    <div class="form-field">
    <label>Priority:</label>
    <select id="task-priority" required>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
</select>
</div>

<div class="form-field">
        <label>Due date:</label>
        <input type="date" required id='task-due-date' autofocus autocomplete="off"></input>
    </div>
                </div>`;
  const buttonTitle = "Add task";
  const buttonId = "add-task";

  const btn = parser.parseFromString(
    `<div class="no-select button button-comfirm" id="${buttonId}">
                    <span>${buttonTitle}</span>
                </div>`,
    "text/html"
  ).body.firstChild;

  return {
    title: "Add new To do",
    content: parser.parseFromString(html, "text/html").body.firstChild,
    button: btn,
  };
}

const taskModal = (() => {
  document.querySelector("#modal").addEventListener("click", (e) => {
    if (e.target.closest("#add-task")) {
      const desc = document.querySelector("#task-desc").value;
      const priority = document.querySelector("#task-priority").value;
      const dueDate = document.querySelector("#task-due-date").value;

      if (desc && priority && dueDate) {
        tasksDOM.addTask(desc, dueDate, priority);
      } else {
        console.log("All fields are required.");
      }
    }
  });
})();

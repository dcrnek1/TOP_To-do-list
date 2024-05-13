import state from "./state";
import Folder, { foldersDOM } from "./folders";

/* Initial load */
if (!("folders" in localStorage) && !("state" in localStorage)) {
  new Folder("General");
  Folder.allFolders.get("General").addTodo("Todo first", "2024-04-05", "High");
  Folder.allFolders.get("General").addTodo("Todo 2nd", "2024-04-05", "Low");
  Folder.allFolders
    .get("General")
    .addTodo("Test3", "2024-04-05", "Medium", true);
  new Folder("Birthdays");
  new Folder("Events");

  state.active = "General";

  localStorage.setItem("folders", JSON.stringify([...Folder.allFolders]));
  localStorage.setItem("state", state.active);
} else {
  JSON.parse(localStorage.folders).forEach((entry) => {
    let folderName = entry[1]._title;
    new Folder(folderName);

    let todos = entry[1].todos;
    todos.forEach((todo) => {
      Folder.allFolders
        .get(folderName)
        .addTodo(todo.text, todo.dueDate, todo.priority, todo.checked);
    });
  });
  state.active = localStorage.state;
}

foldersDOM.populate();

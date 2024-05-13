import Task, { tasksDOM } from "./tasks";
import feather from "/node_modules/feather-icons/dist/feather.min.js";
import state from "./state";

//TODO create folders object

export default class Folder {
  static allFolders = new Map();
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  set title(title) {
    if (Folder.allFolders.get(title)) {
      throw new Error("Folder of that name already exists.");
    }
    this._title = title;

    Folder.allFolders.set(this._title, this);
  }

  addTodo(todoText, todoDueDate, todoPriority, todoChecked = false) {
    this.todos.push(new Task(todoText, todoDueDate, todoPriority, todoChecked));
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  removeFolder() {
    Folder.allFolders.delete(this._title);
  }

  getTodoCount() {
    return this.todos.length;
  }

  getTodos() {
    return this.todos;
  }
}

const foldersDOM = (() => {
  const projectsList = document.querySelector(".projects-list");

  const clearAll = () => {
    projectsList.querySelectorAll(".project").forEach((project) => {
      project.remove();
    });
  };

  const createProjectElement = (title, count) => {
    const parser = new DOMParser();
    const el = parser.parseFromString(
      `<div class="project" data-project="p_${title}">
                        <div class="project-title">
                            <i data-feather="chevron-right" class="small"></i>
                            <div class="project-name">${title}</div>
                        </div>
                        <div class="project-task-count">${count}</div>
                    </div>`,
      "text/html"
    ).body.firstChild;
    return el;
  };

  const populate = () => {
    clearAll();

    Folder.allFolders.forEach((folder) => {
      const project = createProjectElement(folder._title, folder.todos.length);
      projectsList.insertBefore(
        project,
        projectsList.lastChild.previousSibling
      );
    });

    setActive(state.active);

    localStorage.setItem("folders", JSON.stringify([...Folder.allFolders]));
    localStorage.setItem("state", state.active);

    feather.replace();
  };

  const setActive = (title) => {
    document.querySelectorAll(".project.active").forEach((project) => {
      project.classList.remove("active");
    });

    state.active = title;

    tasksDOM.populateTasks();

    if (document.querySelector(`[data-project="p_${title}"]`)) {
        document.querySelector(`[data-project="p_${title}"]`).classList.toggle("active");
    }
    
    addEventListeners();
  };

  const setActiveFirst = () => {
    Folder.allFolders.size > 0 ? setActive(Folder.allFolders.entries().next().value[0]) : setActive('');
    localStorage.state =   Folder.allFolders.size > 0 ? Folder.allFolders.entries().next().value[0] : '';
  }

  const addEventListeners = () => {
    projectsList.querySelectorAll(".project").forEach((project) => {
      project.addEventListener("click", (e) => {
        state.active = project.getAttribute('data-project').substring(2);
        populate();
      });
    });
  };

  return { populate, setActive, setActiveFirst };
})();


export { foldersDOM };

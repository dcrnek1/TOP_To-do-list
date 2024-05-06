import Folder, { foldersDOM } from "./folders";
import state from "./state";
import modal from "./modal";

export default class Task {
    constructor(text, dueDate, priority, checked) {
        this.text = text;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }
}

//Based on clicked task check or uncheck it
const tasksDOM = (() => {


    function addEventListeners () {
        document.querySelectorAll('.todo').forEach((todo) => {
            todo.addEventListener('click', (e) => {
               if (e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
                    e.target.closest('.btn-delete') ? console.log("Delete To do") : undefined;
               } else {
                toggleCheck(todo);
               }
            })
        });
    };

    const toggleCheck = (todo) => {
        todo.classList.toggle("checked");
        todo.querySelector('.checkbox>input').toggleAttribute('checked');
        todo.querySelector('.checkbox>input').toggleAttribute('disabled');

        //TODO ažuriraj array of objects
    }

    const populateTasks = () => {
        if (state.active !== '') {
            document.querySelector('.content').style.visibility = 'visible';
            addFolderTitle(state.active);
            tasksHtml();
        } else {
            document.querySelector('.content').style.visibility = 'hidden';
        }
    }

    const tasksHtml = () => {
        const todosEl = document.querySelector('.todos');

        todosEl.querySelectorAll(".todo").forEach((todo) => {
            todo.remove();
        })

        let tasksHtmlEl = '';
        const parser = new DOMParser();

        if (Folder && Folder.allFolders.get(state.active).todos.length > 0) {
            console.log("Više od 0");
            
            Folder.allFolders.get(state.active).todos.forEach(todo => {
                const htmlEl = `
                <div class="todo">
                <div class="checkbox">
                    <input type="checkbox" id="myCheckbox" ${todo.checked ? 'checked' : ''}>
                </div>
                <div class="todo-main">
                    <div class="todo-name">
                        <div>${todo.text}</div>
                    </div>
                    <div class="todo-info">
                        <div class="todo-data">
                            <div class="todo-date"><i data-feather="calendar" class="small"></i>${todo.dueDate}</div>
                            <div class="todo-priority">
                                <div class="badge badge-${todo.priority.toLowerCase()}"></div> ${todo.priority}
                            </div>
                        </div>
                        <div class="todo-actions">
                            <div class="todo-edit todo-action no-select btn-edit">
                                <i data-feather="edit" class="small"></i>
                                Edit
                            </div>
                            <div class="todo-edit todo-action no-select btn-delete" id="${Folder.allFolders.get(state.active).todos.indexOf(todo)}">
                                <i data-feather="trash-2" class=""></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                `;
            
                tasksHtmlEl += htmlEl;
            })
            
            const childTodos = parser.parseFromString(tasksHtmlEl, 'text/html').body.children;
            console.log(typeof childTodos);
            todosEl.innerHTML = tasksHtmlEl;
            addEventListeners();
        }
        
    }


    const addFolderTitle = (title) => {
        document.querySelector('.folder-title').textContent = title;
    };

    const addTask = (desc, dueDate, priority) => {
        Folder.allFolders.get(state.active).addTodo(desc, dueDate, priority);
        modal.close();
        foldersDOM.populate();
    }

    const deleteFolderInit = (() => {
        document.querySelector(".trash-folder").addEventListener('click', (e) => {
            if(confirm(`Delete folder '${state.active}'?`)) {
                Folder.allFolders.get(state.active).removeFolder();
                foldersDOM.populate();
                foldersDOM.setActiveFirst();
            }
            
        })
    })();

    return {populateTasks, addTask};
})();

export {tasksDOM};
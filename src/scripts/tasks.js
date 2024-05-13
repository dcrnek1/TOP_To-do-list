import Folder, { foldersDOM } from "./folders";
import state from "./state";
import modal from "./modal";
import feather from "/node_modules/feather-icons/dist/feather.min.js";
import newEditTask from '../components/EditTaskModal.js';

export default class Task {
    constructor(text, dueDate, priority, checked) {
        this.text = text;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
    }

    toggleChecked() {
        this.checked = this.checked ? false : true;
    }
}

//Based on clicked task check or uncheck it
const tasksDOM = (() => {
    function addEventListeners () {
        document.querySelectorAll('.todo').forEach((todo) => {
            todo.addEventListener('click', (e) => {
               if (e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
                    e.target.closest('.btn-delete') ? deleteTask(todo.getAttribute('id').substring(2)) : openModalEdit(todo.getAttribute('id').substring(2));
               } else {
                toggleCheck(todo);
               }
            })
        });
    };

    const openModalEdit = (taskId) => {
        const modalContent = new newEditTask(taskId, Folder.allFolders.get(state.active).todos[taskId]);
        modal.open(modalContent.title, modalContent.content, modalContent.button, modalContent.taskId);
    }

    const toggleCheck = (todo) => {
        todo.classList.toggle("checked");
        todo.querySelector('.checkbox>input').toggleAttribute('checked');
        todo.querySelector('.checkbox>input').toggleAttribute('disabled');

        Folder.allFolders.get(state.active).todos[todo.getAttribute('id').substring(2)].toggleChecked()
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

    //Generate HTML for all todays for current state
    const tasksHtml = () => {
        const todosEl = document.querySelector('.todos');
        todosEl.querySelectorAll(".todo").forEach((todo) => {
            todo.remove();
        })

        let tasksHtmlEl = '';

        if (Folder.allFolders.get(state.active) && Folder.allFolders.get(state.active).todos.length > 0) {
            Folder.allFolders.get(state.active).todos.forEach((todo, index) => {
                const htmlEl = `
                <div class="todo${todo.checked ? ' checked' : ''}" id="t_${index}">
                <div class="checkbox">
                    <input type="checkbox" id="myCheckbox" ${todo.checked ? 'checked disabled' : ''}>
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
            
            todosEl.innerHTML = tasksHtmlEl;
            addEventListeners();
            feather.replace();
        }
    }

    const deleteTask = (todoId) => {
        Folder.allFolders.get(state.active).removeTodo(todoId);
        foldersDOM.populate();
    }


    const addFolderTitle = (title) => {
        document.querySelector('.folder-title').textContent = title;
    };

    //Dodaj novi task
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
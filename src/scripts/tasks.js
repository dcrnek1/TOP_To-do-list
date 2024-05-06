import Folder, { foldersDOM } from "./folders";
import state from "./state";

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
    document.querySelectorAll('.todo').forEach((todo) => {
        todo.addEventListener('click', (e) => {
           if (e.target.closest('.btn-edit') || e.target.closest('.btn-delete')) {
                e.target.closest('.btn-delete') ? console.log("Delete To do") : undefined;
           } else {
            toggleCheck(todo);
           }
        })
    });

    const toggleCheck = (todo) => {
        todo.classList.toggle("checked");
        todo.querySelector('.checkbox>input').toggleAttribute('checked');
        todo.querySelector('.checkbox>input').toggleAttribute('disabled');

        //TODO ažuriraj array of objects
    }

    const populateTasks = (title, folder) => {
        if (title !== '') {
            document.querySelector('.content').style.visibility = 'visible';
            addTitle(title);
            addTasks(folder);
        } else {
            document.querySelector('.content').style.visibility = 'hidden';
        }
        
    }

    const addTitle = (title) => {
        document.querySelector('.folder-title').textContent = title;
    };

    const addTasks = (folder) => {
        //console.log(folder);
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


    return {populateTasks};
})();


export {tasksDOM};
import modal from '../scripts/modal';
import Folder from '../scripts/folders';
import state from '../scripts/state';
import { foldersDOM } from '../scripts/folders';

export default function newEditTask (taskId, todo) {
    console.log(todo);
    const parser = new DOMParser();
    const html = `<div class="simple-form" id="pe_${taskId}">
    <div class="form-field">
        <label>Desc:</label>
        <input type="test" id='task-desc' autofocus autocomplete="off" required value="${todo.text}"></input>
    </div>
    <div class="form-field">
    <label>Priority:</label>
    <select id="task-priority" required>
  <option value="High" ${todo.priority === 'High' ? 'selected' : ''}>High</option>
  <option value="Medium" ${todo.priority === 'Medium' ? 'selected' : ''}>Medium</option>
  <option value="Low" ${todo.priority === 'Low' ? 'selected' : ''}>Low</option>
</select>
</div>

<div class="form-field">
        <label>Due date:</label>
        <input type="date" value="${todo.dueDate}" required id='task-due-date' autofocus autocomplete="off"></input>
    </div>
                </div>`;

    const buttonTitle = 'Save';
    const buttonId = 'edit-save';

    const btn = parser.parseFromString(`<div class="no-select button button-comfirm" id="${buttonId}">
                    <span>${buttonTitle}</span>
                </div>`, 'text/html').body.firstChild;

    return {title: "Edit todo", content: parser.parseFromString(html, 'text/html').body.firstChild, button: btn, "taskId": taskId};
}

const taskModal = (() => {
    document.querySelector('#modal').addEventListener('click', (e) => {
        if (e.target.closest('#edit-save')) {
            const desc = document.querySelector('#task-desc').value;
            const priority = document.querySelector('#task-priority').value;
            const dueDate = document.querySelector('#task-due-date').value;
            
            if (desc && priority && dueDate) {
                const taskId = document.querySelector('.simple-form').getAttribute('id').substring(3);
                Folder.allFolders.get(state.active).todos[taskId].text = desc;
                Folder.allFolders.get(state.active).todos[taskId].priority = priority;
                Folder.allFolders.get(state.active).todos[taskId].dueDate = dueDate;
                modal.close();
                foldersDOM.populate();
            } else {
                console.log("All fields are required.");
            }
        };
    })
})();
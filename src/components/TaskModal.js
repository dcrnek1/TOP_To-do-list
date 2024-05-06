import modal from '../scripts/modal';

export default function newTaskModal () {
    const parser = new DOMParser();
    const html = `<p>New task content</p>`;
    const buttonTitle = 'Add task';
    const buttonId = 'add-task';

    const btn = parser.parseFromString(`<div class="no-select button button-comfirm" id="${buttonId}">
                    <span>${buttonTitle}</span>
                </div>`, 'text/html').body.firstChild;

    return {title: "Add new To do", content: parser.parseFromString(html, 'text/html').body.firstChild, button: btn};
}

const taskModal = (() => {
    document.querySelector('#modal').addEventListener('click', (e) => {
        if (e.target.closest('#add-task')) {
            console.log("add task logic");
            console.log(modal);
        };
    })
})();
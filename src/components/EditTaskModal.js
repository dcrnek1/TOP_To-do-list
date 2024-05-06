import modal from '../scripts/modal';

export default function newEditTask () {
    const parser = new DOMParser();
    const html = `<p>Edit todo</p>`;

    const buttonTitle = 'Save';
    const buttonId = 'edit-save';

    const btn = parser.parseFromString(`<div class="no-select button button-comfirm" id="${buttonId}">
                    <span>${buttonTitle}</span>
                </div>`, 'text/html').body.firstChild;

    return {title: "Edit todo", content: parser.parseFromString(html, 'text/html').body.firstChild, button: btn};
}

const taskModal = (() => {
    document.querySelector('#modal').addEventListener('click', (e) => {
        if (e.target.closest('#edit-save')) {
            console.log("Add save todo logic");
            console.log(modal);
        };
    })
})();
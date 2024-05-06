import modal from '../scripts/modal';
import Folder, {foldersDOM} from '../scripts/folders';

export default function newFolderModal () {
    const parser = new DOMParser();
    const html = `<div class="simple-form">
    <div class="form-field">
        <label>Folder name:</label>
        <input type="test" id='folder-title' autofocus autocomplete="off"></input>
    </div>
                </div>`;

    const buttonTitle = 'Add Folder';
    const buttonId = 'add-folder';

    const btn = parser.parseFromString(`<div class="no-select button button-comfirm" id="${buttonId}">
                    <span>${buttonTitle}</span>
                </div>`, 'text/html').body.firstChild;

    return {title: "Add new folder", content: parser.parseFromString(html, 'text/html').body.firstChild, button: btn};
}

const folderModal = (() => {
    document.querySelector('#modal').addEventListener('click', (e) => {
        if (e.target.closest('#add-folder')) {
            const folderTitle = document.querySelector('#folder-title').value;
            try {
                const newFolder = new Folder(folderTitle);
                foldersDOM.populate();
                foldersDOM.setActive(newFolder._title);
                modal.close();
            } catch (e) {
                console.log(e);
            }
        }
    })
})();
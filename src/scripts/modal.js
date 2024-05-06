
import newEditTask from '../components/EditTaskModal.js';
import newFolderModal from '../components/FolderModal.js';
import newTaskModal from '../components/TaskModal.js'


const openModalListeners = (() => {
    const btnAdd = document.querySelectorAll(".add, .btn-edit");
    let modalContent;
    
    btnAdd.forEach(element => {
        element.addEventListener("click", (e) => {
            if (e.target.closest('.add') && e.target.closest('.add').classList.contains('add-project')) {
                modalContent = newFolderModal();
            } else if (e.target.closest('.add')) {
                modalContent = newTaskModal();
            } else if (e.target.closest('.btn-edit')) {
                modalContent = newEditTask();
                console.log("Ovdje ti treba naziv projekta/index taska");
            }

            modal.open(modalContent.title, modalContent.content, modalContent.button);
        })
    });
    
    document.querySelectorAll("#close, .close").forEach(element => {
        element.addEventListener("click", () => {
            modal.close();
        });
    })
    
    window.addEventListener("click", (e) => {
        if (e.target.id === 'modal') {
            modal.close();
        }
    })
})();

const modal = (() => {
    const modal = document.querySelector("#modal");
    const modalTitle = document.querySelector(".modal-title");
    const modalContent = document.querySelector(".modal-content");
    const modalActions = document.querySelector('.modal-actions');

    const open = (title, content, button) => {
        modal.classList.add("show");
        addModalTitle(title);
        addModalContent(content);
        if(button) {
            addModalButton(button);
        }
        if(modal.querySelector('input')) {
            modal.querySelector('input').focus();
        }
    }

    const close = () => {
        modal.classList.remove("show");
        clearModal();
    }

    const addModalTitle = (title) => {
        const titleEl = document.createElement("h3");
        titleEl.textContent = title;
        modalTitle.insertBefore(titleEl, modalTitle.firstChild);
    }

    const addModalContent = (content) => {
        modalContent.appendChild(content);
    }

    const addModalButton = (button) => {
        modalActions.appendChild(button);
    }

    const clearModal = () => {
        const buttonComfirm = document.querySelector('.modal-actions>.button-comfirm');
        modalTitle.removeChild(modalTitle.firstChild);
        modalContent.textContent = '';
        if (buttonComfirm) {
            buttonComfirm.parentNode.removeChild(buttonComfirm);
        }
    }

    return {close, open};
})();

export default modal;
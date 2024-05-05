
import newFolderModal from '../components/addFolderModal.js';
import newTaskModal from '../components/addTaskModal.js'

const openModalListeners = (() => {
    const btnAdd = document.querySelectorAll(".add");
    
    btnAdd.forEach(element => {
        element.addEventListener("click", (e) => {
            let title, content;
            if (e.target.closest('.add').classList.contains('add-project')) {
                title = newFolderModal().title;
                content = newFolderModal().content;
            } else {
                title = newTaskModal().title;
                content = newTaskModal().content;
            }

            modal.open(title, content);
        })
    });
    
    document.querySelector("#close").addEventListener("click", () => {
        modal.close();
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

    const open = (title, content) => {
        modal.classList.add("show");
        addModalTitle(title);
        addModalContent(content);
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

    const clearModal = () => {
        modalTitle.removeChild(modalTitle.firstChild);
        modalContent.textContent = '';
    }

    return {close, open};
})();


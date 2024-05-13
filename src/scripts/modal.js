import newFolderModal from "../components/FolderModal.js";
import newTaskModal from "../components/TaskModal.js";

// Adding event listeners for buttons that open and close modal.
//Based on button clicked opens different modal
const openModalListeners = (() => {
  const btnAdd = document.querySelectorAll(".add");
  let modalContent;

  btnAdd.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (
        e.target.closest(".add") &&
        e.target.closest(".add").classList.contains("add-project")
      ) {
        modalContent = newFolderModal();
      } else if (e.target.closest(".add")) {
        modalContent = newTaskModal();
      }

      modal.open(modalContent.title, modalContent.content, modalContent.button);
    });
  });

  document.querySelectorAll("#close, .close").forEach((element) => {
    element.addEventListener("click", () => {
      modal.close();
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      modal.close();
    }
  });
})();

//Functions for building modal contents/title/buttons depending on given parameters
const modal = (() => {
  const modal = document.querySelector("#modal");
  const modalTitle = document.querySelector(".modal-title");
  const modalContent = document.querySelector(".modal-content");
  const modalActions = document.querySelector(".modal-actions");

  const open = (title, content, button, taskId = undefined) => {
    modal.classList.add("show");
    addModalTitle(title);
    addModalContent(content);
    if (button) {
      addModalButton(button);
    }
    if (modal.querySelector("input")) {
      modal.querySelector("input").focus();
    }
  };

  const close = () => {
    modal.classList.remove("show");
    clearModal();
  };

  const addModalTitle = (title) => {
    const titleEl = document.createElement("h3");
    titleEl.textContent = title;
    modalTitle.insertBefore(titleEl, modalTitle.firstChild);
  };

  const addModalContent = (content) => {
    modalContent.appendChild(content);
  };

  const addModalButton = (button) => {
    modalActions.appendChild(button);
  };

  const clearModal = () => {
    const buttonComfirm = document.querySelector(
      ".modal-actions>.button-comfirm"
    );
    modalTitle.removeChild(modalTitle.firstChild);
    modalContent.textContent = "";
    if (buttonComfirm) {
      buttonComfirm.parentNode.removeChild(buttonComfirm);
    }
  };

  return { close, open };
})();

export default modal;

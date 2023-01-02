import { dateFormatter } from "../util.js";

class UI {
  constructor() {
    this.inquiriesTableBody = document.querySelector(".inquiries-table__body");
  }

  render(parentEl, data) {
    if (data.length === 0) return alert("No Document found");

    if (parentEl === "inquiries") {
      data.forEach((inquiry, index) => {
        let { name, email, date } = inquiry;

        date = dateFormatter(date);

        this.inquiriesTableBody.insertAdjacentHTML(
          "beforeend",
          `       <tr data-inquiry-row="${index}">
                    <td class="center">${index + 1}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${date}</td>
                    <td class="table-inquiries-action">
                      <button class="btn btn--secondary btn--small read-inquiry-btn" data-id="${index}">Read</button>
                      <button class="btn btn--tertiary btn--small delete-inquiry-btn">Delete</button>
                    </td>
                </tr>
            `
        );
      });
    }
  }

  removeEl(parEl, elId) {
    // GET PARENT ELEMENT OF THE ELEMENT TO REMOVE
    const parentEl = document.querySelector(`.${parEl}`);

    // REMOVE ELEMENT
    parentEl.querySelector(`[data-inquiry-row="${elId}"]`).remove();
  }
}

class ModalClass extends UI {
  constructor() {
    super();
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.inquiriesTableBody = document.querySelector(".inquiries-table__body");
    this.#addEventListeners();
  }

  openCloseModal() {
    this.#openCloseModalFunc();
  }

  create(modalName, data) {
    // CONSTRUCT CUSTOM MODAL
    if (modalName === "inquiryDetailsModal") {
      let { name, msg, date } = data;
      date = dateFormatter(date);
      // CREATE MARKUP
      let markup = `
          <div class="modal__inquiry">
            <span class="modal__close">&times;</span>
            <h2 class="heading-primary">${name}</h2>
            <p class="paragraph">${msg}</p>
            <p class="paragraph">${date}</p>
          </div>
        `;

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    } else if (modalName === "deleteConfBoxModal") {
      // CREATE MARKUP
      // TODO: CUSTOMIZE DELETE WORNING MESSAGE
      let markup = `
          <div class="modal-diolog-box confirm-dialog-box">
        <div class="modal-header">
          <i class="fa-solid fa-trash"></i>
          <h3 class="heading-primary">Delete Inquiry</h3>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="modal-body">
          <p class="paragraph">Are you sure you want to delete message from <b>${data}<b>?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn--tartiary close-modal-confirm-box">No</button>
          <button class="btn btn--primary yes-delete">Yes</button>
        </div>
      </div>
        `;

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    }

    // TO SUPPORT CHAINING
    return this;
  }

  #addEventListeners() {
    this.modal.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("modal__close") ||
        e.target.classList.contains("close-modal-confirm-box")
      )
        this.#openCloseModalFunc();
    });

    this.overlay.addEventListener("click", (e) => {
      this.#openCloseModalFunc();
    });
  }

  #openCloseModalFunc() {
    this.modal.classList.toggle("show-modal");
    setTimeout(() => {
      this.overlay.classList.toggle("show-overlay");
    }, 50);
  }
}

export const ui = new UI();
export const Modal = new ModalClass();

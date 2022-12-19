import { dateFormatter } from "../util.js";

class UI {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.document = document.querySelector("html");
    this.inquiriesTableBody = document.querySelector(".inquiries-table__body");

    this.#addEventListeners();
  }

  openCloseModal() {
    this.#openCloseModalFunc();
  }

  render(parentEl, data) {
    if (data.length === 0) return alert("No Document found");

    if (parentEl === "inquiries") {
      data.forEach((inquiry, index) => {
        let { name, email, date } = inquiry;

        date = dateFormatter(date);

        this.inquiriesTableBody.insertAdjacentHTML(
          "beforeend",
          `       <tr data-id="${index}">
                    <td class="center">${index + 1}</td>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${date}</td>
                    <td class="table-inquiries-action">
                      <button class="btn btn--secondary btn--small read-inquiry-btn" data-id="${index}">Read</button>
                      <button class="btn btn--tartiary btn--small delete-inquiry-btn">Delete</button>
                    </td>
                </tr>
            `
        );
      });
    }
  }

  removeEl() {}

  #addEventListeners() {
    this.document.addEventListener("click", (e) => {
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

  #buildModal(modName) {}
}

const ui = new UI();

export default ui;

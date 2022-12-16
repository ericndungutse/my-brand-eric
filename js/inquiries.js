"use strict";

// Initialise state
const state = {
  inquiryToDelete: null,
  inquiries: JSON.parse(window.localStorage.getItem("inquiries")),
};

// // Connect to Localstorage
// const state = {
//   inquiries: JSON.parse(window.localStorage.getItem("inquiries")),
// };

const inquiriesTableBody = document.querySelector(".inquiries-table__body");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const inquiryModal = document.querySelector(".modal__inquiry");

// Date Formatter
const dateFormatter = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

// Open/Close Modal
const openCloseModal = () => {
  modal.classList.toggle("show-modal");
  overlay.classList.toggle("show-overlay");
};

// Close modal handlers
modal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("modal__close") ||
    e.target.classList.contains("close-modal-confirm-box")
  )
    openCloseModal();
});
overlay.addEventListener("click", openCloseModal);

// Render Inquiries
state.inquiries.forEach((inquiry, index) => {
  let { name, email, date } = inquiry;

  date = dateFormatter(date);

  inquiriesTableBody.insertAdjacentHTML(
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

// Get and Render Inquiry
const readInquiryBtn = document.querySelectorAll(".read-inquiry-btn");

// 1) Get inquiry based on index.
readInquiryBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = btn.getAttribute("data-id");
    let { name, msg, date } = state.inquiries[id];

    date = dateFormatter(date);

    modal.innerHTML = "";

    // Render inquiry
    modal.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="modal__inquiry">
      <span class="modal__close">&times;</span>
        <h2 class="heading-primary">${name}</h2>
        <p class="paragraph">${msg}</p>
        <p class="paragraph">${date}</p>
        </div>
    `
    );

    openCloseModal();
  });
});

// DELETE Inquiry
// Open Delete confirm box
inquiriesTableBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-inquiry-btn")) {
    modal.innerHTML = "";
    modal.insertAdjacentHTML(
      "beforeend",
      `<div class="modal-diolog-box confirm-dialog-box">
        <div class="modal-header">
          <i class="fa-solid fa-trash"></i>
          <h3 class="heading-primary">Delete Inquiry</h3>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete address ?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn--tartiary close-modal-confirm-box">No</button>
          <button class="btn btn--primary yes-delete">Yes</button>
        </div>
      </div>`
    );
    modal.classList.toggle("show-modal");
    overlay.classList.toggle("show-overlay");

    const inquiry = Number(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );

    state.inquiryToDelete = inquiry;
  }
});

// Actually Delete
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("yes-delete")) return;

  state.inquiries.splice(state.inquiryToDelete, 1);

  // Update Local Storage with updated version of data
  localStorage.setItem("inquiries", JSON.stringify(state.inquiries));
});

"use strict";

import Inquiry from "../model/model.js";
import ui from "../view/view.js";
import { dateFormatter } from "../util.js";

const state = {
  inquiryToDelete: null,
};

const inquiriesTableBody = document.querySelector(".inquiries-table__body");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Render Inquiries
document.addEventListener("DOMContentLoaded", () => {
  const inquiries = Inquiry.get("inquiries");
  ui.render("inquiries", inquiries);
});

// 1) Get inquiry
// *****TODO*****Add click on document, if target is btn, call getOne(element clicked)
inquiriesTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-inquiry-btn")) {
    // Get ID of the inquiry from its button
    const id = +e.target.getAttribute("data-id");

    // Get inquiry based on ID
    const inquiry = Inquiry.getOne(id);

    let { name, msg, date } = inquiry;
    date = dateFormatter(date);

    // Clear Modal
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

    // Open Modal
    ui.openCloseModal();
  }
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

  inquiries.splice(state.inquiryToDelete, 1);

  // Update Local Storage with updated version of data
  localStorage.setItem("inquiries", JSON.stringify(inquiries));

  openCloseModal();
});

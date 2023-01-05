"use strict";
import { Inquiry } from "../model/model.js";
import { Modal, Table } from "../view/view.js";

const state = {
  inquiryToDelete: null,
};

const inquiriesTableBody = document.querySelector(".inquiries-table__body");
const modal = document.querySelector(".modal");

/* ***** ENVENT LISTENERS ***** */

/* 1) Render Inquiries*/
document.addEventListener("DOMContentLoaded", renderInquiries);

/* 2) Render inquiry */
inquiriesTableBody.addEventListener("click", renderInquiry);

/* 3) Open Delete Confirm box */
inquiriesTableBody.addEventListener("click", areSureYouWantToDelete);

/* 4) Confirm Delete Inquiry */
modal.addEventListener("click", confirDeleteInquiry);

/* ***** HANDLERS ***** */

/* 1) RENDER INQUIRIES  */
function renderInquiries() {
  const inquiries = Inquiry.get("inquiries");
  Table.renderRow(inquiries);
}

/* 2) RENDER DETAIL MODAL */
function renderInquiry(e) {
  if (e.target.classList.contains("read-inquiry-btn")) {
    // Get ID of the inquiry from its button
    const id = +e.target.parentElement.parentElement.dataset.id;

    // Get inquiry based on ID
    const inquiry = Inquiry.getOne(id);

    // CREATE & OPEN Modal
    Modal.create("inquiryDetailsModal", inquiry).openCloseModal();
  }
}

/* 3) Open Delete Inquiry Confirm Alert */
function areSureYouWantToDelete(e) {
  if (e.target.classList.contains("delete-inquiry-btn")) {
    //Get the id of inquiry to delete
    const inquiryToDelete = e.target.parentElement.parentElement.dataset.id;

    // Get inquiry based on ID
    const sender =
      e.target.parentElement.parentElement.querySelector(
        ".sender-name"
      ).textContent;

    // CREATE & OPEN Modal
    Modal.create("deleteConfBoxModal", sender).openCloseModal();

    state.inquiryToDelete = inquiryToDelete;
  }
}

/* 4) Confirm Delete Inquiry */
//  TODO:
// ALERT TO NOTIFY USER OF SUCCESS DELETE
function confirDeleteInquiry(e) {
  if (!e.target.classList.contains("yes-delete")) return;

  // DELETE INQUIRY
  Inquiry.deleteOne(state.inquiryToDelete);

  // REMOVE ELEMENT IN DOM CONTAINING DELETE INQUIRY
  Table.removeEl("inquiries-table__body", state.inquiryToDelete);

  // Close Modal
  Modal.openCloseModal();
}

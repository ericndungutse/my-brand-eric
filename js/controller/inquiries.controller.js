"use strict";
import { Modal, Table } from "../view/view.js";
import { fetchHandler, errorHandler, checkUser } from "../util.js";

const state = {
  inquiries: [],
  inquiryToDelete: null,
  token: JSON.parse(localStorage.getItem("token")),
};

document.addEventListener("DOMContentLoaded", async () => {
  const { token } = state;

  if (token) {
    const user = await checkUser(token);

    if (user) {
      const inquiriesTableBody = document.querySelector(
        ".inquiries-table__body"
      );

      const modal = document.querySelector(".modal");

      /* 1) RENDER INQUIRIES  */

      async function renderInquiries() {
        try {
          const res = await fetchHandler("GET", "messages", state.token);

          if (res.status !== "success") {
            throw Error(res.message);
          }

          const inquiries = res.data.messages;
          state.inquiries = inquiries;
          Table.renderRows(inquiriesTableBody, inquiries);
        } catch (err) {
          errorHandler(err);
        }
      }

      await renderInquiries();

      document.querySelector(".checking_user").style.display = "none";

      /* ***** ENVENT LISTENERS ***** */

      /* 2) Render inquiry */
      inquiriesTableBody.addEventListener("click", renderInquiry);

      /* 3) Open Delete Confirm box */
      inquiriesTableBody.addEventListener("click", areSureYouWantToDelete);

      /* 4) Confirm Delete Inquiry */
      modal.addEventListener("click", confirDeleteInquiry);

      /* ***** HANDLERS ***** */

      /* 2) RENDER DETAIL MODAL */
      function renderInquiry(e) {
        if (e.target.classList.contains("read-inquiry-btn")) {
          // Get ID of the inquiry from its button
          const id = e.target.parentElement.parentElement.dataset.id;

          const inquiry = state.inquiries.find((inquiry) => inquiry._id === id);

          // CREATE & OPEN Modal
          Modal.create("inquiryDetailsModal", inquiry).openCloseModal();
        }
      }

      /* 3) Open Delete Inquiry Confirm Alert */
      function areSureYouWantToDelete(e) {
        if (e.target.classList.contains("delete-inquiry-btn")) {
          //Get the id of inquiry to delete
          const inquiryToDelete =
            e.target.parentElement.parentElement.dataset.id;

          // CREATE & OPEN Modal
          Modal.create(
            "deleteConfBoxModal",
            "Are you sure you want to delete this message"
          ).openCloseModal();

          state.inquiryToDelete = inquiryToDelete;
        }
      }

      /* 4) Confirm Delete Inquiry */
      async function confirDeleteInquiry(e) {
        if (!e.target.classList.contains("yes-delete")) return false;

        try {
          const res = await fetchHandler(
            "DELETE",
            `messages/${state.inquiryToDelete}`,
            state.token
          );

          if (res.status !== 204) {
            const data = await res.json();
            throw Error(await data.message);
          }
          // REMOVE ELEMENT IN DOM CONTAINING DELETE INQUIRY
          Table.removeEl("inquiries-table__body", state.inquiryToDelete);

          showAlert("success", "Message deleted.");
        } catch (err) {
          // Close Modal
          Modal.openCloseModal();
          errorHandler(err);
        }
      }
    } else {
      location.assign("/sign-in.html");
    }
  } else {
    location.assign("/sign-in.html");
  }
});

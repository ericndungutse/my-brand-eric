"use strict";

// Connect to Localstorage
const db = {
  inquiries: JSON.parse(window.localStorage.getItem("inquiries") || []),
};

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
  if (e.target.classList.contains("modal__close")) openCloseModal();
});
overlay.addEventListener("click", openCloseModal);

// Render Inquiries
db.inquiries.forEach((inquiry, index) => {
  let { name, email, date } = inquiry;

  date = dateFormatter(date);

  inquiriesTableBody.insertAdjacentHTML(
    "beforeend",
    `       <tr>
                  <td class="center">${index}</td>
                  <td>${name}</td>
                  <td>${email}</td>
                  <td>${date}</td>
                  <td class="table-inquiries-action">
                    <button class="btn btn--secondary btn--small read-inquiry-btn" data-id="${index}">Read</button>
                    <button class="btn btn--primary btn--small">Delete</button>
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
    let { name, msg, date } = db.inquiries[id];

    date = dateFormatter(date);

    inquiryModal.innerHTML = "";

    inquiryModal.insertAdjacentHTML(
      "afterbegin",
      `
      <span class="modal__close">&times;</span>
        <h2 class="heading-primary">${name}</h2>
        <p class="paragraph">${msg}</p>
        <p class="paragraph">${date}</p>
    `
    );

    openCloseModal();
  });
});

// // 2) Render inquiry

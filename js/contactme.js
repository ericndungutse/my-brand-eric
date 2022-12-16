"use strict";

import Inquiry from "./model.js";
const contactMeForm = document.querySelector(".contact-me-form");

// Form That submits an inquiry
contactMeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formElements = contactMeForm.elements;

  // Create inquiry object
  const inquiry = {
    name: formElements["name"].value,
    email: formElements["email"].value,
    msg: formElements["msg"].value,
    date: new Date(),
  };

  // Add enquiry obj to local storage.
  Inquiry.create(inquiry);

  // Reset inputs of the form
  formElements["name"].value = "";
  formElements["email"].value = "";
  formElements["msg"].value = "";
});

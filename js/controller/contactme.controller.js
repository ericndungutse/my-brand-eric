"use strict";

import { Inquiry } from "../model/model.js";
import {
  isEmailValid,
  inputInvalid,
  inputValid,
  initialInputStyles,
  btnLoading,
  showAlert,
  fetchHandler,
  errorHandler,
} from "../util.js";

const contactMeForm = document.querySelector(".contact-me-form");
const formElements = contactMeForm.elements;

const email = formElements["email"];
const name = formElements["name"];
const message = formElements["msg"];
const btn = formElements["contact-me-btn"];

// Form That submits an inquiry
contactMeForm.addEventListener("submit", async (e) => {
  try {
    btnLoading(btn, "addLoading");
    e.preventDefault();
    // Create inquiry object
    const inquiry = {
      name: formElements["name"].value,
      email: formElements["email"].value,
      message: formElements["msg"].value,
    };

    // Add enquiry obj to local storage.
    const res = await fetchHandler("POST", "messages", null, inquiry);

    if (res.status === "fail") {
      throw Error(res.message);
    }

    showAlert("success", "Message received! We'll get back to you shortly");
    btnLoading(btn, "removeLoading", "Send");

    // Reset inputs of the form
    formElements["name"].value = "";
    formElements["email"].value = "";
    formElements["msg"].value = "";

    initialInputStyles(name);
    initialInputStyles(email);
    initialInputStyles(message);
  } catch (err) {
    btnLoading(btn, "removeLoading", "Send");
    errorHandler(err);
  }
});

// VALIDATION
email?.addEventListener("input", (e) => {
  if (!isEmailValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

email?.addEventListener("focus", (e) => {
  if (!isEmailValid(e.target.value) || e.target.value.length === 0) {
    inputInvalid(e.target);
  }
});

email?.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isEmailValid(email.value)) {
    inputInvalid(email);
  }
});

name.addEventListener("focus", (e) => {
  if (!isTextFieldEmpty(name.value)) {
    inputInvalid(e.target);
  }
});

name.addEventListener("input", (e) => {
  if (!isTextFieldEmpty(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

name.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isTextFieldEmpty(email.value)) {
    inputInvalid(email);
  }
});

message.addEventListener("focus", (e) => {
  if (!isTextFieldEmpty(e.target.value)) {
    inputInvalid(e.target);
  }
});

message.addEventListener("input", (e) => {
  if (!isTextFieldEmpty(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

message.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isTextFieldEmpty(e.target.value)) {
    inputInvalid(email);
  }
});

function isTextFieldEmpty(msg) {
  return msg.length > 0;
}

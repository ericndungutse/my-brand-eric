import {
  isEmailValid,
  isPassValid,
  inputInvalid,
  inputValid,
  initialInputStyles,
  url,
  showAlert,
  btnLoading,
  errorHandler,
} from "../util.js";

const form = document.querySelector(".forgot-pass-form");
const formElements = form.elements;

const email = formElements["email"];
const btn = formElements["reset-send-email-btn"];

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

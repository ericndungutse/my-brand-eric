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

const form = document.querySelector(".reset-password-form");
const formElements = form.elements;

const newPassword = formElements["newPassword"];
const confirmPassword = formElements["confirmPassword"];
const btn = formElements["reset-password-btn"];

newPassword.addEventListener("focus", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

newPassword.addEventListener("input", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

newPassword.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isPassValid(e.target.value)) {
    inputInvalid(e.target.value);
  }
});

confirmPassword.addEventListener("focus", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

confirmPassword.addEventListener("input", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

confirmPassword.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isPassValid(e.target.value)) {
    inputInvalid(e.target.value);
  } else {
    inputValid(e.target);
  }
});

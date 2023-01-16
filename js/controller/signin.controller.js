import {
  isEmailValid,
  isPassValid,
  inputInvalid,
  inputValid,
  initialInputStyles,
} from "../util.js";

const signinForm = document.querySelector(".sign-in-form");
const signinFormElements = signinForm.elements;

const email = signinFormElements["email"];
const password = signinFormElements["password"];

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

password.addEventListener("focus", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

password.addEventListener("input", (e) => {
  if (!isPassValid(e.target.value)) {
    inputInvalid(e.target);
  } else {
    inputValid(e.target);
  }
});

password.addEventListener("blur", (e) => {
  if (e.target.value < 1) {
    initialInputStyles(e.target);
  } else if (!isEmailValid(email.value)) {
    inputInvalid(email);
  }
});

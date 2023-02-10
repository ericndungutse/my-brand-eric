import {
  isEmailValid,
  fetchHandler,
  inputInvalid,
  inputValid,
  initialInputStyles,
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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    btnLoading(btn, "addLoading");
    const body = {
      email: email.value,
    };

    const res = await fetchHandler("POST", "auth/forgot-password", null, body);

    if (res.status !== "success") {
      throw Error(res.message);
    }

    email.value = "";
    initialInputStyles(email);
    btnLoading(btn, "removeLoading", "Send");
    showAlert("success", res.message);
  } catch (err) {
    btnLoading(btn, "removeLoading", "Send");
    errorHandler(err);
  }
});

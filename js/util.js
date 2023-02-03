export const dateFormatter = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

// Check Email
export function isEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Check Password
export function isPassValid(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
}

// Input styles if valid
export function inputValid(el) {
  el.parentElement.lastElementChild.classList.remove("show-valid-msg");
  el.nextElementSibling.name = "checkmark-outline";
  el.nextElementSibling.style.color = "#00c000";
  el.classList.remove("inputInitial");
  el.classList.remove("inputInvalid");
  el.classList.add("inputValid");
}

// Input styles if invalid
export function inputInvalid(el) {
  el.parentElement.lastElementChild.classList.add("show-valid-msg");
  el.nextElementSibling.classList.add("show-login-input-icon");
  el.nextElementSibling.name = "close-circle-outline";
  el.nextElementSibling.style.color = "#fe308a";
  el.classList.remove("inputInitial");
  el.classList.remove("inputValid");
  el.classList.add("inputInvalid");
}

// Initial input styles
export function initialInputStyles(el) {
  el.nextElementSibling.classList.remove("show-login-input-icon");
  el.classList.add("inputInitial");
  el.classList.remove("inputValid");
  el.classList.remove("inputValid");
  el.parentElement.lastElementChild.classList.remove("show-valid-msg");
}

export function isTextFieldEmpty(text) {
  return text.length > 0;
}

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("beforebegin", markup);

  window.setTimeout(hideAlert, 5000);
};

export const btnLoading = (btn, type, textContent) => {
  if (type === "addLoading") {
    btn.disabled = true;
    btn.classList.add("loading");
    btn.innerHTML = `<span class="spinner"></span>`;
  }

  if (type === "removeLoading") {
    btn.disabled = false;
    btn.classList.remove("loading");
    btn.innerHTML = textContent;
  }
};

export const url = "http://127.0.0.1:3000/api";

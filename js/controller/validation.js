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

// Check Email
function isEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Check Password
function isPassValid(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
}

// Input styles if valid
function inputValid(el) {
  el.parentElement.lastElementChild.classList.remove("show-valid-msg");
  el.nextElementSibling.name = "checkmark-outline";
  el.nextElementSibling.style.color = "#00c000";
  el.classList.remove("inputInitial");
  el.classList.remove("inputInvalid");
  el.classList.add("inputValid");
}

// Input styles if invalid
function inputInvalid(el) {
  el.parentElement.lastElementChild.classList.add("show-valid-msg");
  el.nextElementSibling.classList.add("show-login-input-icon");
  el.nextElementSibling.name = "close-circle-outline";
  el.nextElementSibling.style.color = "#fe308a";
  el.classList.remove("inputInitial");
  el.classList.remove("inputValid");
  el.classList.add("inputInvalid");
}

// Initial input styles
function initialInputStyles(el) {
  el.nextElementSibling.classList.remove("show-login-input-icon");
  el.classList.add("inputInitial");
  el.classList.remove("inputValid");
  el.classList.remove("inputValid");
  el.parentElement.lastElementChild.classList.remove("show-valid-msg");
}

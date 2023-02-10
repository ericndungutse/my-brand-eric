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

// ***** SIGNING ******
signinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formElements = signinForm.elements;
  const email = formElements["email"].value;
  const password = formElements["password"].value;
  const btn = formElements["login-btn"];
  try {
    const reqBody = { email, password };

    btnLoading(btn, "addLoading");
    const res = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const data = await res.json();
    if (data.status === "fail") {
      btnLoading(btn, "removeLoading", "Login");
      throw Error(data.message);
    }

    btnLoading(btn, "removeLoading", "Login");

    window.localStorage.setItem("token", JSON.stringify(data.token));
    // window.localStorage.setItem("user", JSON.stringify(data.data.user));

    location.assign("/dashboard.html");
  } catch (err) {
    btnLoading(btn, "removeLoading", "Login");
    errorHandler(err);
  }
});

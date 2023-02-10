import {
  fetchHandler,
  isPassValid,
  inputInvalid,
  inputValid,
  initialInputStyles,
  url,
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

const getParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("token");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = getParam();

  try {
    btnLoading(btn, "addLoading");
    const body = {
      password: newPassword.value,
      confirmPassword: confirmPassword.value,
    };

    const res = await fetchHandler(
      "POST",
      `auth/reset-password/${token}`,
      null,
      body
    );

    if (res.status !== "success") {
      throw Error(res.message);
    }

    window.localStorage.setItem("token", JSON.stringify(res.token));
    location.assign("/dashboard.html");
  } catch (err) {
    btnLoading(btn, "removeLoading", "Send");
    errorHandler(err);
  }
});

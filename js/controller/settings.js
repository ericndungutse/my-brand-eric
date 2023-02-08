import {
  errorHandler,
  fetchHandler,
  checkUser,
  btnLoading,
  showAlert,
} from "../util.js";

const state = {
  token: JSON.parse(localStorage.getItem("token")),
};

// Fill The form with user info
document.addEventListener("DOMContentLoaded", async () => {
  const { token } = state;

  if (token) {
    const user = await checkUser(token);

    if (user) {
      if (user.role !== "admin")
        document.querySelector(".inquiries-link").remove();

      document.querySelector(".checking_user").style.display = "none";
      const form = document.querySelector(".update-password-form");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formElements = form.elements;
        const btn = formElements["update-password-btn"];

        const reqBody = {
          currentPassword: formElements["currentPassword"].value,
          password: formElements["password"].value,
          confirmPassword: formElements["confirPassword"].value,
        };

        btnLoading(btn, "addLoading");

        try {
          const res = await fetchHandler(
            "POST",
            "auth/update-password",
            state.token,
            reqBody
          );

          if (res.status !== "success") {
            throw Error(res.message);
          }

          btnLoading(btn, "removeLoading", "Update");

          showAlert("success", "Update was successfull!");
        } catch (err) {
          btnLoading(btn, "removeLoading", "Update");
          errorHandler(err);
        }
      });
    } else {
      location.assign("/my-brand-eric/sign-in.html");
    }
  } else {
    location.assign("/my-brand-eric/sign-in.html");
  }
});

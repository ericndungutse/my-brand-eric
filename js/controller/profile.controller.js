import {
  btnLoading,
  errorHandler,
  fetchHandler,
  checkUser,
  showAlert,
} from "../util.js";

const state = {
  token: JSON.parse(localStorage.getItem("token")),
  user: null,
};

// Fill The form with user info
document.addEventListener("DOMContentLoaded", async () => {
  const { token } = state;

  if (token) {
    const user = await checkUser(token);

    if (user) {
      if (user.role !== "admin")
        document.querySelector(".inquiries-link").remove();
      state.user = user;

      const form = document.querySelector(".profile-form");
      const formElements = form.elements;

      const user_name = formElements["name"];
      const user_email = formElements["email"];
      const user_phone = formElements["phone"];
      const user_country = formElements["country"];
      const btn = formElements["update-profile-btn"];

      user_name.value = state.user.name;
      user_email.value = state.user.email;
      user_phone.value = state.user.phone ? state.user.phone : "";
      user_country.value = state.user.country ? state.user.country : "";

      document.querySelector(".checking_user").style.display = "none";

      document.addEventListener("submit", async (e) => {
        e.preventDefault();

        btnLoading(btn, "addLoading");

        try {
          const body = {
            ...(user_name.value && { name: user_name.value }),
            ...(user_email.value && { email: user_email.value }),
            ...(user_phone.value && { tel: user_phone.value }),
            ...(user_country.value && { country: user_country.value }),
          };

          const res = await fetchHandler(
            "PATCH",
            "users/updateMe",
            state.token,
            body
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
      location.assign("/sign-in.html");
    }
  } else {
    location.assign("/sign-in.html");
  }
});

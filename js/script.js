"use strict";
import { checkUser, fetchHandler } from "./util.js";

const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");
const openMobileNavBtn = document.querySelector(".open-mobile-nav-icon");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");

const url = document.URL;

if (
  !url.includes("dashboard") &&
  !url.includes("manageblogs") &&
  !url.includes(
    "inquiries.html" && !url.includes("settings") && url.includes("dashboard")
  )
) {
  openMobileNavBtn.addEventListener("click", () => {
    overlay.classList.add("show-overlay");
    mobileNav.classList.add("show-mobile-nav");
  });

  closeMobileNavBtn.addEventListener("click", () => {
    overlay.classList.remove("show-overlay");
    mobileNav.classList.remove("show-mobile-nav");
  });

  // Check User and change navigation
  document.addEventListener("DOMContentLoaded", async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      console.log(token);
      const user = await checkUser(token);
      console.log(user);
      if (user) {
        const userNav = document.querySelector(".header__user-nav");
        userNav
          .querySelector(".header-profile-picture")
          .classList.remove("hidden");

        userNav.querySelector(".spinner").classList.add("hidden");
      } else {
        addLoginBtn();
      }
    } else {
      addLoginBtn();
    }
  });
}
// Hide default message for invalid inputs on submit
document.addEventListener(
  "invalid",
  (function () {
    return function (e) {
      e.preventDefault();
      e.target.focus();
    };
  })(),
  true
);

const addLoginBtn = () => {
  document.querySelector(".header__user-nav").innerHTML = "";
  document.querySelector(
    ".header__user-nav"
  ).innerHTML = `<a href="sign-in.html" class="btn btn--primary btn--big btn--link"
          >Signin</a>`;
};

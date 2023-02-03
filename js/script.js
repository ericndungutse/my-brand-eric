"use strict";

const mobileNav = document.querySelector(".mobile-nav");
const overlay = document.querySelector(".overlay");
const openMobileNavBtn = document.querySelector(".open-mobile-nav-icon");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");

openMobileNavBtn.addEventListener("click", () => {
  overlay.classList.add("show-overlay");
  mobileNav.classList.add("show-mobile-nav");
});

closeMobileNavBtn.addEventListener("click", () => {
  overlay.classList.remove("show-overlay");
  mobileNav.classList.remove("show-mobile-nav");
});

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

// Check User
document.addEventListener("DOMContentLoaded", () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    // TODO: GET USER FROM SERVER
    const user = JSON.parse(localStorage.getItem("user"));
    const userNav = document.querySelector(".header__user-nav");
    userNav.querySelector(".header-profile-picture").classList.remove("hidden");

    userNav.querySelector(".spinner").classList.add("hidden");
  } else {
    document.querySelector(
      ".header__user-nav"
    ).innerHTML = `<a href="sign-in.html" class="btn btn--primary btn--big btn--link"
          >Log in</a
        >`;
  }
});

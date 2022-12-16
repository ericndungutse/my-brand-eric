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

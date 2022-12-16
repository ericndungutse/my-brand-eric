"use strict";

// Initialise state

let inquiries = window.localStorage.getItem("inquiries")
  ? window.localStorage.getItem("inquiries")
  : window.localStorage.setItem("inquiries", JSON.stringify([]));

inquiries = JSON.parse(window.localStorage.getItem("inquiries"));

const state = {
  inquiryToDelete: null,
  inquiries,
};

export default state;

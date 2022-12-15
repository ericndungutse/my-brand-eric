let db = {};
const contactMeForm = document.querySelector(".contact-me-form");

console.log(contactMeForm);
// IIFE INITIALIZER
(function () {
  let inquiries = localStorage.getItem("inquiries");

  if (!inquiries) {
    inquiries = localStorage.setItem("inquiries", JSON.stringify([]));
  }

  db.inquiries = JSON.parse(inquiries);
})();

// Form That submits an inquiry
contactMeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formElements = contactMeForm.elements;

  const msg = {
    name: formElements["name"].value,
    email: formElements["email"].value,
    msg: formElements["msg"].value,
  };

  db.inquiries.push(msg);
  localStorage.setItem("inquiries", JSON.stringify(db.inquiries));

  formElements["name"].value = "";
  formElements["email"].value = "";
  formElements["msg"].value = "";
});

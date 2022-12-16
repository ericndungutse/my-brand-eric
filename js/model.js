import state from "./index.js";

class Collection {
  create(doc) {
    // Get Collection in which to add new doc
    let colName = this.constructor.name === "InquiryCOl" ? "inquiries" : null;

    // Update State
    state.inquiries.push(doc);

    // Update State
    this.#updateLocalStorage(state.inquiries);

    // Return the created Document
    return doc;
  }

  // Update Local storage Method
  #updateLocalStorage(data) {
    localStorage.setItem("inquiries", JSON.stringify(data));
  }
}

class InquiryCOl extends Collection {
  constructor() {
    super();
  }
}

const Inquiry = new InquiryCOl();

export default Inquiry;

// inquiry.create({
//   name: "Eric Ndungutse",
//   email: "dav.ndungutse@gmail.com",
//   msg: "Message 1",
// });

// console.log(state);

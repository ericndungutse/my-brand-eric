class Collection {
  // Global Create Method
  create(doc) {
    // Get Collection in which to add new doc
    let colName = this.constructor.name === "InquiryCOl" ? "inquiries" : null;

    // Get Collection
    const col = this.#getCol(colName) || this.#createColInLocalStorage(colName);

    // Push new document into the collection
    col.push(doc);

    //Update localStorage
    this.#updateLocalStorage(colName, col);

    // Return the created Document
    return doc;
  }

  // Global Get Method
  get(colName) {
    return this.#getCol(colName);
  }

  // PRIVATE METHODS
  // Update Local storage Method
  #updateLocalStorage(ColName, data) {
    localStorage.setItem(ColName, JSON.stringify(data));
  }

  // Get collection
  #getCol(colName) {
    return JSON.parse(localStorage.getItem(colName));
  }

  // creates an array if col doesnot exist in ocalstorage
  #createColInLocalStorage(colName) {
    localStorage.setItem(colName, JSON.stringify([]));
    return this.#getCol(colName);
  }
}

class InquiryCOl extends Collection {
  constructor() {
    super();
  }
}

const Inquiry = new InquiryCOl();

export default Inquiry;

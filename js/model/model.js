class Collection {
  // Global Create Method
  create(doc) {
    // Get Collection in which to add new doc
    const colName = this.#getConstructorName(this);

    // Get Collection
    const col = this.#getCol(colName) || this.#createColInLocalStorage(colName);

    if (col.length > 0) {
      doc.id = col[col.length - 1].id + 1;
    } else {
      doc.id = col.length + 1;
    }

    // Push new document into the collection
    col.push(doc);

    //Update localStorage
    this.#updateLocalStorage(colName, col);

    // Return the created Document
    return doc;
  }

  // Global Get Method
  get(colName) {
    return this.#getCol(colName) || this.#createColInLocalStorage(colName);
  }

  // Get one
  getOne(id) {
    // Get Collection in which to retrieve a doc
    const colName = this.#getConstructorName(this);

    const col = this.#getCol(colName);

    const doc = col.find((c) => +c.id === +id);

    return doc;
  }

  // DELETE doc
  deleteOne(id) {
    // Get Collection in which to retrieve a doc
    const colName = this.#getConstructorName(this);

    // GET COLLECTION
    const col = this.#getCol(colName);

    // DELETE DOC WITH ID (id)
    const pos = col.findIndex((c) => +c.id === +id);
    col.splice(pos, 1);

    //Update localStorage
    this.#updateLocalStorage(colName, col);
  }

  // PRIVATE METHODS
  // Dermine constructor name
  #getConstructorName() {
    const col = this.constructor.name;
    switch (col) {
      case "InquiryCOl":
        return "inquiries";
      case "BlogCol":
        return "blogs";
    }
  }
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
class BlogCol extends Collection {
  constructor() {
    super();
  }
}

export const Inquiry = new InquiryCOl();
export const Blog = new BlogCol();

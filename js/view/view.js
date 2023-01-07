import { dateFormatter } from "../util.js";

class UI {
  constructor() {
    this.inquiriesTableBody = document.querySelector(".inquiries-table__body");
  }

  removeEl(parEl, elId) {
    // GET PARENT ELEMENT OF THE ELEMENT TO REMOVE
    const parentEl = document.querySelector(`.${parEl}`);

    // REMOVE ELEMENT
    parentEl.querySelector(`[data-id="${elId}"]`).remove();
  }

  _buildMarkup(el, data) {
    switch (el) {
      case "inquiryRow":
        return `<tr data-id="${data.id}">
                    <td class="center">${data.index + 1}</td>
                    <td class="sender-name">${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.date}</td>
                    <td class="table-inquiries-action">
                      <button class="btn btn--secondary btn--small read-inquiry-btn" data-id="${
                        data.index
                      }">Read</button>
                      <button class="btn btn--tertiary btn--small delete-inquiry-btn">Delete</button>
                    </td>
                </tr>`;
        break;

      case "inquiryDetailsModal":
        return `<div class="modal__inquiry">
            <span class="modal__close">&times;</span>
            <h2 class="heading-primary">${data.name}</h2>
            <p class="paragraph">${data.msg}</p>
            <p class="paragraph">${data.date}</p>
          </div>`;
        break;

      case "deleteConfBoxModal":
        return `
          <div class="modal-diolog-box confirm-dialog-box">
        <div class="modal-header">
          <i class="fa-solid fa-trash"></i>
          <h3 class="heading-primary">Delete Inquiry</h3>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="modal-body">
          <p class="paragraph">Are you sure you want to delete message from <b>${data}<b>?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn--tertiary close-modal-confirm-box">No</button>
          <button class="btn btn--primary yes-delete">Yes</button>
        </div>
      </div>
        `;

      case "createBlogModal":
        return `
         <span class="modal__close">×</span>
         <div class="blog-modal">
        <h3 class="heading-primary">Create Blog</h3>
        <form action="" class="form blogForm create-blog-form">
          <div class="form-input-group">
            <label for="" class="form-input-label">Title</label>
            <input
              type="text"
              name="title"
              id=""
              class="form-input"
              placeholder="Title..."
              
            />
          </div>

          <div class="form-input-group">
            <label for="" class="form-input-label">Text</label>
            <textarea name="text" id="" cols="30" rows=7" class="form-textarea" placeholder="Blog Text...."></textarea>
          </div>

          <div class="form-input-group">
            <label for="" class="form-input-label">Image Icon</label>
            <input type="file" name="img" id="" placeholder="Image..." />
          </div>
          <button class="btn btn--primary btn--small update-blog-btn">Post</button>
        </form>
        </div>
        `;

      case "updateBlogModal":
        return `
         <span class="modal__close">×</span>
         <div class="blog-modal">
        <h3 class="heading-primary">Update Blog</h3>
        <form action="" class="form blogForm update-blog-form" data-id="${data.id}">
          <div class="form-input-group">
            <label for="" class="form-input-label">Title</label>
            <input
              type="text"
              name="title"
              id=""
              class="form-input"
              placeholder="Title..."
              value="${data.title}"
            />
          </div>

          <div class="form-input-group">
            <label for="" class="form-input-label">Text</label>
            <textarea name="text" id="" cols="30" rows="7" class="form-textarea" >
${data.text}</textarea
            >
          </div>

          <div class="form-input-group">
            <label for="" class="form-input-label">Image Icon</label>
            <input type="file" name="img" id="" placeholder="Image..." />
          </div>
          <button class="btn btn--primary btn--small update-blog-btn">Update</button>
        </form>
        </div>
      `;

      case "dashboardBlog":
        return `<div class="blog" id="dashboard-blog" data-id="${data.id}">
            <div class="dropdown">
              <div class="blog__menu">
                <span class="blog__menu-item blog__menu-update-btn">Edit</span>
                <span class="blog__menu-item blog__menu-delete-btn">Delete</span>
              </div>
            </div>
            <div class="blog__header">
              <div class="blog__user-time">
                <img
                  src="./img/default.jpg"
                  class="blog__user-image"
                  alt="user_image"
                />

                <div class="blog__user-names-time">
                  <p class="blog__user-names">${data.user.name}</p>
                  <p class="blog__time">${data.date}</p>
                </div>
              </div>

              <div class="blog__menu--icon">
                <spam class="blog__menu-icon-dot">.</spam>
                <spam class="blog__menu-icon-dot">.</spam>
                <spam class="blog__menu-icon-dot">.</spam>
              </div>
            </div>
            <img
              src="/img/work images/express 2.png"
              class="blog__image"
              alt="Blog Image"
            />

            <div class="blog__content">
              <p class="paragraph blog__text">
                ${data.title}
              </p>

              <a href="#" class="btn btn--secondary btn-small btn--link"
                >Read More</a
              >
            </div>
          </div>`;
      default:
        break;
    }
  }
}

// MODAL SUBCLASS
class ModalClass extends UI {
  constructor() {
    super();
    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.inquiriesTableBody = document.querySelector(".inquiries-table__body");
    this.#addEventListeners();
  }

  openCloseModal() {
    this.#openCloseModalFunc();
  }

  create(modalName, data) {
    // CONSTRUCT CUSTOM MODAL
    if (modalName === "inquiryDetailsModal") {
      let { name, msg, date } = data;
      date = dateFormatter(date);
      // CREATE MARKUP
      let markup = this._buildMarkup("inquiryDetailsModal", {
        name,
        msg,
        date,
      });

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    }

    if (modalName === "deleteConfBoxModal") {
      // CREATE MARKUP
      let markup = this._buildMarkup("deleteConfBoxModal", data);

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    }

    if (modalName === "createBlogModal") {
      // CREATE MARKUP
      let markup = this._buildMarkup("createBlogModal");

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    }

    if (modalName === "updateBlogModal") {
      // CREATE MARKUP
      let markup = this._buildMarkup("updateBlogModal", data);

      // Clear Modal
      this.modal.innerHTML = "";

      // INSERT MARKUP INSIDE MODAL ELEMENT
      this.modal.insertAdjacentHTML("afterbegin", markup);
    }

    // TO SUPPORT CHAINING
    return this;
  }

  #addEventListeners() {
    this.modal &&
      this.modal.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("modal__close") ||
          e.target.classList.contains("close-modal-confirm-box")
        )
          this.#openCloseModalFunc();
      });

    this.overlay &&
      this.overlay.addEventListener("click", (e) => {
        this.#openCloseModalFunc();
      });
  }

  #openCloseModalFunc() {
    this.modal.classList.toggle("show-modal");
    setTimeout(() => {
      this.overlay.classList.toggle("show-overlay");
    }, 50);
  }
}

// TABLE SUBLASS
class TableClass extends UI {
  constructor() {
    super();
  }

  renderRow(data) {
    if (data.length === 0) return alert("No Document found");

    data.forEach((inquiry, index) => {
      let { name, email, date, id } = inquiry;

      date = dateFormatter(date);

      const markup = this._buildMarkup("inquiryRow", {
        name,
        email,
        date,
        id,
        index,
      });

      this.inquiriesTableBody.insertAdjacentHTML("beforeend", markup);
    });
  }
}

class BlogClass extends UI {
  constructor() {
    super();
    this.blogsContainer = document.querySelector(".dashboard__blogs");
  }

  renderBlogs(data) {
    if (data.length === 0) return alert("No Document found");

    this.blogsContainer.innerHTML = "";

    data.forEach((blog) => {
      let { title, date, user, id } = blog;

      date = dateFormatter(date);

      const markup = this._buildMarkup("dashboardBlog", {
        title,
        date,
        user,
        id,
      });

      this.blogsContainer.insertAdjacentHTML("beforeend", markup);
    });
  }

  insertBlog(blog) {
    let { title, date, user, id } = blog;

    date = dateFormatter(date);

    const markup = this._buildMarkup("dashboardBlog", {
      title,
      user,
      date,
      id,
    });

    this.blogsContainer.insertAdjacentHTML("afterbegin", markup);
  }

  openMenu(e) {
    // Close All Menues
    this.closeMenues();

    // Open Current Menu
    e.target.parentElement.parentElement.querySelector(
      ".dropdown"
    ).style.display = "block";
  }

  closeMenues() {
    const menues = document.querySelectorAll(".dropdown");
    menues.forEach((menue) => (menue.style.display = "none"));
  }
}

// const ui = new UI();
export const Modal = new ModalClass();
export const Table = new TableClass();
export const Blog = new BlogClass();

import { dateFormatter } from "../util.js";

class UI {
  removeEl(parEl, elId) {
    // GET PARENT ELEMENT OF THE ELEMENT TO REMOVE
    const parentEl = document.querySelector(`.${parEl}`);

    // REMOVE ELEMENT
    parentEl.querySelector(`[data-id="${elId}"]`).remove();
  }

  _buildMarkup(el, data) {
    switch (el) {
      case "inquiryRow":
        return `<tr data-id="${data._id}">
                    <td class="sender-name">${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.createdAt}</td>
                    <td class="table-inquiries-action">
                      <button class="btn btn--secondary btn--small read-inquiry-btn" data-id="${data._id}">Read</button>
                      <button class="btn btn--tertiary btn--small delete-inquiry-btn">Delete</button>
                    </td>
                </tr>`;

      case "blogRow":
        return `
                <tr data-id="${data._id}">
                    <td class="sender-name">${data.title}</td>
                    <td>${data.createdAt}</td>
                    <td class="table-inquiries-action">
                      <button class="btn btn--secondary btn--small blog__menu-update-btn">Update</button>
                      <button class="btn btn--tertiary btn--small blog__menu-delete-btn">Delete</button>
                    </td>
                </tr>
                  `;

      case "inquiryDetailsModal":
        return `<div class="modal__inquiry">
            <span class="modal__close">&times;</span>
            <h2 class="heading-primary">${data.name}</h2>
            <p class="paragraph">${data.message}</p>
            <p class="paragraph">${data.createdAt}</p>
          </div>`;

      case "deleteConfBoxModal":
        return `
          <div class="modal-diolog-box confirm-dialog-box">
        <div class="modal-header">
          <i class="fa-solid fa-trash"></i>
          <h3 class="heading-primary">Delete Inquiry</h3>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="modal-body">
          <p class="paragraph"><b>${data}<b>?</p>
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

          <div class="input-icon-container">
           <input
              type="text"
              name="title"
              id=""
              class="form-input inputInitial"
              placeholder="Title..."
              required
            />

            <ion-icon
              name="close-circle-outline"
              class="login-input-icon invalid-icon"
            ></ion-icon>

            <span class="validation-msg">Enter blog title. It cannot be empty!</span>
          </div>
        </div>
        <div class="form-input-group">
           <label for="" class="form-input-label">Text</label>

          <div class="input-icon-container">
            <textarea name="text" id="" cols="30" rows=7" class="form-textarea inputInitial" placeholder="Blog Text...." required></textarea>

            <ion-icon
              name="close-circle-outline"
              class="login-input-icon invalid-icon"
            ></ion-icon>

            <span class="validation-msg">Blog cannot be empty.</span>
          </div>
        </div> <div class="form-input-group blog-image-input-group">
            <label for="blogImagePicker" class="form-input-label blog-image-label"><ion-icon name="image-outline" class="date-picker-icon"></ion-icon><span class="blog-image-label-text">Choose Image</span>
            </label><input type="file" name="img" class="blog-image-picker" id="blogImagePicker"/>
           <span class="upload-progress"></span>
          </div>
          <button class="btn btn--primary btn--small update-blog-btn" id="create-blog-btn">Post</button>
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
              class="form-input inputInitial"
              placeholder="Title..."
              value="${data.title}"
            />
          </div>

          <div class="form-input-group">
            <label for="" class="form-input-label">Text</label>
            <textarea name="text" id="" cols="30" rows="7" class="form-textarea inputInitial" >
              ${data.text}
              </textarea>
          </div>

          <div class="form-input-group blog-image-input-group">
            <label for="blogImagePicker" class="form-input-label blog-image-label"><ion-icon name="image-outline" class="date-picker-icon"></ion-icon><span class="blog-image-label-text">Choose Image</span>
            </label><input type="file" name="img" value="${data.photo}" class="blog-image-picker" id="blogImagePicker" placeholder="Image..." />
           <span class="upload-progress"></span>
          </div>
          <button class="btn btn--primary btn--small update-blog-btn" id="update-blog-btn">Update</button>
        </form>
        </div>
      `;

      case "dashboardBlog":
        return `<div class="blog" id="dashboard-blog" data-id="${data.id}">
            <div class="dropdown">
              <div class="blog__menu">
                <span class="blog__menu-item blog__menu-update-btn"><ion-icon name="create-outline"></ion-icon> Edit</span>
                <span class="blog__menu-item blog__menu-delete-btn"><ion-icon name="trash-outline"></ion-icon> Delete</span>
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
            <div class="blog__image-container">
            <img
              src="/img/psud.png"
              class="blog__image"
              alt="Blog Image"
            />
            </div>

            <div class="blog__content">
              <p class="paragraph blog__text">
                ${data.title}
              </p>

              <a href="#" class="btn btn--secondary btn-small btn--link"
                >Read More</a
              >
            </div>
          </div>`;

      case "blogspage":
        return `<div class="blog">
            <div class="blog__header">
              <div class="blog__user-time">
                <img
                  src="./img/default.jpg"
                  class="blog__user-image"
                  alt="user_image"
                />

                <div class="blog__user-names-time">
                  <p class="blog__user-names">${data.user.name}</p>
                  <p class="blog__time">${data.createdAt}</p>
                </div>
              </div>
            </div>

          <div class="blog__image-container">
          
          <img
            src="${data.photo}"
            class="blog__image"
            alt="Blog Image"
          />
          </div>

        <div class="blog__content">
          <p class="paragraph blog__text">
            ${data.title}
          </p>

          <a href="/blog.html?id=${data._id}" class="btn btn--secondary btn-small btn--link"
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
      let { name, message, createdAt } = data;
      createdAt = dateFormatter(createdAt);
      // CREATE MARKUP
      let markup = this._buildMarkup("inquiryDetailsModal", {
        name,
        message,
        createdAt,
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

  renderRows(parentEl, data, blogs = false) {
    if (data.length === 0) return alert("No Document found");

    parentEl.innerHTML = "";

    let markup;

    const rowType = blogs === true ? "blogRow" : "inquiryRow";

    data.forEach((datum, index) => {
      let obj = { ...datum };

      obj.createdAt = dateFormatter(obj.createdAt);
      obj.index = index;

      markup = this._buildMarkup(`${rowType}`, obj);
      parentEl.insertAdjacentHTML("beforeend", markup);
    });
  }

  insertRow(parentEl, data, blog = false) {
    const rowType = blog === true ? "blogRow" : "inquiryRow";

    let obj = { ...data };

    obj.createdAt = dateFormatter(obj.createdAt);

    const markup = this._buildMarkup(`${rowType}`, obj);
    parentEl.insertAdjacentHTML("beforeend", markup);
  }
}

class BlogClass extends UI {
  constructor() {
    super();
  }

  renderBlogs(parentEl, data, type) {
    if (data.length === 0) return "no blogs";

    // parentEl.innerHTML = "";

    data.forEach((blog) => {
      let { title, user, _id, photo, createdAt } = blog;

      createdAt = dateFormatter(createdAt);

      const markup = this._buildMarkup(`${type}`, {
        title,
        createdAt,
        user,
        _id,
        photo,
      });

      parentEl.insertAdjacentHTML("beforeend", markup);
    });
  }

  insertBlog(parentEl, blog) {
    let { title, date, user, id } = blog;

    date = dateFormatter(date);

    const markup = this._buildMarkup("dashboardBlog", {
      title,
      user,
      date,
      id,
    });

    parentEl.insertAdjacentHTML("afterbegin", markup);
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

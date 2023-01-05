"use strict";
import { Modal } from "../view/view.js";
import { Blog } from "../model/model.js";
import { Blog as BlogUI } from "../view/view.js";

const state = {
  blogToDelete: null,
};

const createBlogBtn = document.querySelector(".create-blog-btn");
const createModalForm = document.querySelector(".blogForm");
const modal = document.querySelector(".modal");

/* EVENT LISTENERS */
// Get Blogs when Contents gets loaded And Update State
document.addEventListener("DOMContentLoaded", renderBlogs);

// Create Blog in LocalStorage
createModalForm.addEventListener("submit", createBlog);

// Open Blog Modal
createBlogBtn.addEventListener("click", openBlogModal);

// Create and Open Blog Menu
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("blog__menu--icon")) {
    BlogUI.openMenu(e);
  }
});

// Close Blog Menu
document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("blog__menu--icon") &&
    !e.target.classList.contains("blog__menu") &&
    !e.target.classList.contains("blog__menu-item")
  ) {
    BlogUI.closeMenues();
  }
});

// Delete Blog
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("blog__menu-delete-btn")) {
    areSureYouWantToDelete(e);
  }
});

/* Confirm Delete Inquiry */
modal.addEventListener("click", confirDeleteBlog);

/* Habdlers */
// Get and Render blogs
function renderBlogs() {
  const blogs = Blog.get("blogs");
  BlogUI.renderBlogs(blogs);
}

// Create Blog
function createBlog(e) {
  e.preventDefault();
  const formElements = createModalForm.elements;

  // Create inquiry object
  const blog = {
    title: formElements["title"].value,
    text: formElements["text"].value,
    img: formElements["img"].value,
    user: {
      name: "Eric Ndungutse",
      avat: "",
    },
    date: new Date(),
  };

  // Add Blog obj to local storage.
  const newBlog = Blog.create(blog);

  // Update UI with new BLog
  BlogUI.insertBlog(newBlog);
  // Reset inputs of the form
  formElements["title"].value = "";
  formElements["text"].value = "";
  formElements["img"].value = "";

  // Close Modal
  Modal.openCloseModal();
}

// Open Blog Modal
function openBlogModal() {
  // OPEN Modal
  Modal.openCloseModal();
}

/* Open Delete Blog Confirm Alert */
function areSureYouWantToDelete(e) {
  if (e.target.classList.contains("blog__menu-delete-btn")) {
    //Get the id of inquiry to delete
    const blogId =
      e.target.parentElement.parentElement.parentElement.dataset.id;

    // Get inquiry based on ID
    const title =
      e.target.parentElement.parentElement.parentElement.querySelector(
        ".blog__text"
      ).textContent;

    // CREATE & OPEN Modal
    Modal.create("deleteConfBoxModal", title).openCloseModal();

    state.blogToDelete = blogId;
  }
}

/* Confirm Delete Inquiry */
//  TODO:
// ALERT TO NOTIFY USER OF SUCCESS DELETE
function confirDeleteBlog(e) {
  if (!e.target.classList.contains("yes-delete")) return;

  // DELETE BLOG FROM LOCAL STORAGE
  Blog.deleteOne(+state.blogToDelete);

  // REMOVE ELEMENT IN DOM CONTAINING DELETE INQUIRY
  BlogUI.removeEl("dashboard__blogs", +state.blogToDelete);

  // Close Modal
  Modal.openCloseModal();
}

"use strict";
import { Modal } from "../view/view.js";
import { Blog } from "../model/model.js";
import { Blog as BlogUI } from "../view/view.js";

const state = {
  blogToDelete: null,
};

const createBlogBtn = document.querySelector(".create-blog-btn");
const modal = document.querySelector(".modal");
const blogsContainer = document.querySelector(".dashboard__blogs");

/* EVENT LISTENERS */
// Get Blogs when Contents gets loaded And Update State
document.addEventListener("DOMContentLoaded", renderBlogs);

// Open Blog Modal
createBlogBtn.addEventListener("click", openBlogModal);

// Save Blog in LocalStorage
document.addEventListener("submit", createBlog);

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

// Open Update Blog Modal
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("blog__menu-update-btn")) {
    // Get ID of the Blog
    const blogId =
      e.target.parentElement.parentElement.parentElement.dataset.id;

    // Get Blog based on ID
    const blog = Blog.getOne(blogId);

    // CREATE & OPEN Modal
    Modal.create("updateBlogModal", blog).openCloseModal();
  }
});

// Update
document.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("update-blog-form")) return false;
  const formElements = e.target.elements;

  // Create inquiry object
  const newBlogData = {
    title: formElements["title"].value,
    text: formElements["text"].value,
    img: formElements["img"].value,
  };

  const blogs = Blog.UpdateOne(e.target.dataset.id, newBlogData);

  BlogUI.renderBlogs(blogsContainer, blogs, "dashboardBlog");

  // Close Modal
  Modal.openCloseModal();
});

/* Confirm Delete Inquiry */
modal.addEventListener("click", confirDeleteBlog);

/* Habdlers */
// Get and Render blogs
function renderBlogs() {
  const blogs = Blog.get("blogs");

  BlogUI.renderBlogs(blogsContainer, blogs, "dashboardBlog");
}

// Create Blog
function createBlog(e) {
  e.preventDefault();
  if (!e.target.classList.contains("create-blog-form")) return false;
  const formElements = e.target.elements;

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
  BlogUI.insertBlog(blogsContainer, newBlog);
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
  Modal.create("createBlogModal").openCloseModal();
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

"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { Modal } from "../view/view.js";
import { Blog } from "../model/model.js";
import { Table } from "../view/view.js";
import { Blog as BlogUI } from "../view/view.js";

const state = {
  blogToDelete: null,
  imageUrl: "",
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSvzyDWCz-A3IfcIuWyxdtctkMK7zK7H4",
  authDomain: "portofolio-a303c.firebaseapp.com",
  projectId: "portofolio-a303c",
  storageBucket: "portofolio-a303c.appspot.com",
  messagingSenderId: "148229634212",
  appId: "1:148229634212:web:0e266564e6fda891bdce31",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const createBlogBtn = document.querySelector(".create-blog-btn");
const modal = document.querySelector(".modal");
const blogsContainer = document.querySelector(".dashboard__blogs");
const blogsTableBody = document.querySelector(".blogs-table__body");

/* EVENT LISTENERS */

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
    const blogId = e.target.parentElement.parentElement.dataset.id;

    // // Get ID of the Blog
    // TODO ID FOR CARD
    // const blogId =
    //   e.target.parentElement.parentElement.parentElement.dataset.id;

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
  const updatedBlog = {
    title: formElements["title"].value,
    text: formElements["text"].value,
    img: formElements["img"].value,
  };

  // TODO CARDS
  // const blogs = Blog.UpdateOne(+e.target.dataset.id, updatedBlog);

  // BlogUI.renderBlogs(blogsContainer, blogs, "dashboardBlog");

  // TABLE
  const blogs = Blog.UpdateOne(+e.target.dataset.id, updatedBlog);

  // WITH TABLE
  Table.renderRows(blogsTableBody, blogs, true);

  // Reset inputs of the form
  formElements["title"].value = "";
  formElements["text"].value = "";
  formElements["img"].value = "";

  // Close Modal
  Modal.openCloseModal();
});

/* Confirm Delete Inquiry */
modal.addEventListener("click", confirDeleteBlog);

/* Habdlers */

// Create Blog
function createBlog(e) {
  e.preventDefault();
  if (!e.target.classList.contains("create-blog-form")) return false;
  const formElements = e.target.elements;

  // Create inquiry object
  const blog = {
    title: formElements["title"].value,
    text: formElements["text"].value,
    imgUrl: state.imageUrl,
    user: {
      name: "Eric Ndungutse",
      avat: "",
    },
    date: new Date(),
  };

  // Add Blog obj to local storage.
  const newBlog = Blog.create(blog);

  /*WITH CARD*/
  // Update UI with new BLog
  // BlogUI.insertBlog(blogsContainer, newBlog);

  // WITH TABLE
  Table.insertRow(blogsTableBody, newBlog, true);

  // Reset inputs of the form
  formElements["title"].value = "";
  formElements["text"].value = "";

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
    // Table
    //Get the id of inquiry to delete
    const blogId = e.target.parentElement.parentElement.dataset.id;

    // Card
    // //Get the id of inquiry to delete
    // const blogId =
    //   e.target.parentElement.parentElement.parentElement.dataset.id;

    // CREATE & OPEN Modal
    Modal.create(
      "deleteConfBoxModal",
      "Are you sure you want to delete this blog"
    ).openCloseModal();

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
  // BlogUI.removeEl("dashboard__blogs", +state.blogToDelete);

  // TABLE
  // REMOVE ELEMENT IN DOM CONTAINING DELETE INQUIRY
  BlogUI.removeEl("blogs-table__body", +state.blogToDelete);

  // Close Modal
  Modal.openCloseModal();
}

// Upload Image handler
function uploadImg(className) {
  const ref = firebase.storage().ref();
  const image = document.querySelector(`.${className}`).files[0];
  const imageName = +new Date() + "-" + image.name;

  const metadata = {
    contentType: image.type,
  };

  document.querySelector(
    ".blog-image-label-text"
  ).innerHTML = ` <span class="spinner"></span>`;

  // Uploads Image
  const task = ref.child(imageName).put(image, metadata);

  // Get url of uploaded image
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      state.imageUrl = url;
      document.querySelector(".blog-image-label-text").innerHTML = imageName;
    })
    .catch((error) => {
      document.querySelector(".blog-image-label-text").innerHTML =
        "Something went wrong! Please try again later";
      console.log(error);
    });
}

// Upload Image Ivent Listener
document.addEventListener("change", (e) => {
  if (!e.target.classList.contains("blog-image-picker")) return;
  uploadImg("blog-image-picker");
});

// With Table
// Get Blogs when Contents gets loaded And Update State - USING TabLE
document.addEventListener("DOMContentLoaded", renderBlogsTable);

// RENDER BLOGS / TABLE
function renderBlogsTable() {
  const blogs = Blog.get("blogs");

  Table.renderRows(blogsTableBody, blogs, true);
}

// With Cards
// Get Blogs when Contents gets loaded And Update State
// document.addEventListener("DOMContentLoaded", renderBlogs);

// Get and Render blogs
function renderBlogs() {
  const blogs = Blog.get("blogs");

  BlogUI.renderBlogs(blogsContainer, blogs, "dashboardBlog");
}

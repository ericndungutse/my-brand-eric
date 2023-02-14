import { Blog as BlogUI } from "../view/view.js";

import { showAlert, url } from "../util.js";

const blogsContainer = document.querySelector(".blogs");
const spinnerContainer = document.querySelector(".infinite-scroll");

const state = {
  page: 1,
  lastPage: false,
};

/* EVENT LISTENERS */
// Get Blogs when Contents gets loaded And Update State
document.addEventListener("DOMContentLoaded", renderBlogs);

/* Habdlers */
// Get and Render blogs
async function renderBlogs(page = 1) {
  const blogs = await loadBlogs(page);

  if (blogs.length === 0) state.lastPage = true;

  // Remove Spinner if present
  if (
    blogsContainer.firstElementChild.classList.contains("spinner-container")
  ) {
    blogsContainer.firstElementChild.remove();
  }
  const res = BlogUI.renderBlogs(blogsContainer, blogs, "blogspage");
  if (res === "no blogs") {
    spinnerContainer.textContent =
      "No more blogs! Please, comeback after sometime.";
  }
}

const loadBlogs = async (page) => {
  try {
    const res = await fetch(`${url}/blogs?page=${page}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status === "fail") {
      throw Error(data.message);
    }

    return data.data.blogs;
  } catch (error) {
    showAlert("error", error.message);
  }
};

// Infinite Scroll
let options = {
  root: null,
  rootMargin: "0px",
};

let observer = new IntersectionObserver(async function (entries) {
  if (entries[0].intersectionRatio <= 0) return;

  if (state.lastPage === true) {
    return false;
  }
  state.page = state.page + 1;

  // Request Api
  spinnerContainer.innerHTML = `<div class="spinner spinner--bigger"></div>`;
  await renderBlogs(state.page);
}, options);

observer.observe(spinnerContainer);

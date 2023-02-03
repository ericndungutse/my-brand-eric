import { Blog as BlogUI } from "../view/view.js";
import { Blog } from "../model/model.js";
import { showAlert, url } from "../util.js";

const blogsContainer = document.querySelector(".blogs");

/* EVENT LISTENERS */
// Get Blogs when Contents gets loaded And Update State
document.addEventListener("DOMContentLoaded", renderBlogs);

/* Habdlers */
// Get and Render blogs
async function renderBlogs() {
  const blogs = await loadBlogs();
  BlogUI.renderBlogs(blogsContainer, blogs, "blogspage");
}

const loadBlogs = async () => {
  try {
    const res = await fetch(`${url}/blogs`, {
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

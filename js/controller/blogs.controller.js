import { Blog as BlogUI } from "../view/view.js";
import { Blog } from "../model/model.js";

const blogsContainer = document.querySelector(".blogs");

/* EVENT LISTENERS */
// Get Blogs when Contents gets loaded And Update State
document.addEventListener("DOMContentLoaded", renderBlogs);

/* Habdlers */
// Get and Render blogs
function renderBlogs() {
  const blogs = Blog.get("blogs");
  BlogUI.renderBlogs(blogsContainer, blogs, "blogspage");
}

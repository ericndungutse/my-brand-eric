document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/blogs");
    const blogs = await res.json();
    console.log(blogs);
  } catch (err) {
    console.log("error", err);
  }
});

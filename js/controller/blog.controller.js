import { fetchHandler, errorHandler, showAlert, btnLoading } from "../util.js";

const state = {
  token: JSON.parse(localStorage.getItem("token")),
  user: JSON.parse(localStorage.getItem("user")),
};

const blogContainer = document.querySelector(".blog-page");
const commentsContainer = document.querySelector(".blog-page__comments");

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const id = getId();
    const res = await fetchHandler("GET", `blogs/${id}`);

    if (!res.status === "success") {
      throw Error(data.message);
    }

    renderBlog(res.data.blog);
  } catch (err) {
    errorHandler(err);
  }
});

const getId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("id");
};

const renderBlog = (blog) => {
  blogContainer.firstElementChild.remove();
  const markup = `
   <img
        src="${blog.photo}"
        class="blog-page__image"
        alt=""
      />

      <h1 class="heading-primary blog-page__title">
        ${blog.title}
      </h1>

  <div class="blog-page__text">
      <p class="paragraph">
        ${blog.text}
      </p>
      </div>
${
  state.token === null
    ? ""
    : `
    <button class="btn btn--tertiary btn--big like-btn" >Like</button>
    <form action="" class="form blog-page__comment-form">
        <textarea
          name=""
          id="comment"
          cols="30"
          rows="1"
          class="form-textarea"
          placeholder="Say something..."
        ></textarea>

        <button class="btn btn--secondary btn--small" id="comment-btn">Send</button>
      </form>
`
}`;

  blogContainer.insertAdjacentHTML("afterbegin", markup);
};

const renderComment = (comment) => {
  const markup = `<div class="comment">
          <div class="comment__user">
            <img
              src="img/default.jpg"
              class="comment-user-img blog__user-image"
              alt=""
            />

            <span class="comment__user-name blog__user-names"
              >${state.user.name}</span
            >
          </div>

          <p class="paragraph comment__text">
            ${comment}
          </p>
        </div>`;

  commentsContainer.insertAdjacentHTML("afterbegin", markup);
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = "";
  comments.forEach((cmt) => {
    commentsContainer.insertAdjacentHTML(
      "afterend",
      `<div class="comment">
          <div class="comment__user">
            <img
              src="img/default.jpg"
              class="comment-user-img blog__user-image"
              alt=""
            />

            <span class="comment__user-name blog__user-names"
              >${cmt.user.name}</span
            >
          </div>

          <p class="paragraph comment__text">
            ${cmt.comment}
          </p>
        </div>`
    );
  });
};

// Add Comment
document.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    !state.token &&
    !e.target.classList.contains("form blog-page__comment-form")
  )
    return;

  const commentForm = e.target;
  const formElements = commentForm.elements;
  const commentInput = formElements["comment"];
  const btn = formElements["comment-btn"];
  try {
    btnLoading(btn, "addLoading");

    const id = getId();

    const body = {
      blog: id,
      comment: commentInput.value,
    };

    const res = await fetchHandler("POST", "comments", state.token, body);

    if (res.status !== "success") {
      throw Error(res.message);
    }

    btnLoading(btn, "removeLoading", "Send");
    showAlert("success", "Comment added.");
    renderComment(res.data.comment.comment);
    e.target.elements["comment"].value = "";
  } catch (err) {
    btnLoading(btn, "removeLoading", "Send");

    errorHandler(err);
  }
});

// Like Blog
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("like-btn")) {
    try {
      const id = getId();

      const body = {
        blog: id,
      };
      const res = await fetchHandler("POST", `likes/`, state.token, body);
      if (res.status !== "success") {
        throw Error(res.message);
      }

      e.target.classList.remove("btn--tertiary");
      e.target.classList.add("btn--primary");
      e.target.textContent = "Liked";
    } catch (err) {
      errorHandler(err);
    }
  }
});

// Load Comments
document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    const blogId = getId();

    const res = await fetchHandler("GET", `blogs/${blogId}/comments`);

    if (res.status !== "success") {
      throw Error(res.message);
    }

    renderComments(res.data.comments);
  } catch (err) {
    errorHandler(err);
  }
});

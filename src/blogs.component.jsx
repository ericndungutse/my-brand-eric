const LoadingSpinner = () => {
  return (
    <div className="spinner-container blogs__spinner">
      <div className="spinner spinner--bigger"></div>
    </div>
  );
};

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <div className="blog__header">
        <div className="blog__user-time">
          <img
            src="./img/default.jpg"
            className="blog__user-image"
            alt="user_image"
          />

          <div className="blog__user-names-time">
            <p className="blog__user-names">{blog.user.name}</p>
            <p className="blog__time">{blog.createdAt}</p>
          </div>
        </div>
      </div>

      <div className="blog__image-container">
        <img src={blog.photo} className="blog__image" alt="Blog Image" />
      </div>

      <div className="blog__content">
        <p className="paragraph blog__text">{blog.title}</p>

        <button className="btn btn--secondary btn-small btn--link">
          Read More
        </button>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [page, setPage] = React.useState(1);
  const [blogs, setBlogs] = React.useState({
    isLoading: true,
    blogs: [],
  });

  React.useEffect(() => {
    async function getBlogs() {
      const res = await fetch(
        `https://ndungutse.onrender.com/api/blogs?limit=100`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        }
      );

      const { data } = await res.json();

      setBlogs({ ...blogs, blogs: data.blogs, isLoading: false });
    }

    getBlogs();
  }, [page]);

  let components;

  if (blogs.isLoading) components = <LoadingSpinner />;
  if (!blogs.isLoading && blogs.blogs.length > 1) {
    components = (
      <>
        {blogs.blogs.map((blog) => {
          return <Blog blog={blog} key={blog._id} />;
        })}
      </>
    );
  }

  return components;
};

const blogsRootNode = document.querySelector("#root");
const blogsRoot = ReactDOM.createRoot(blogsRootNode);
blogsRoot.render(<Blogs />);

const ShowcaseIntro = () => {
  return (
    <div className="showcase__intro">
      <h1 className="heading-primary">
        <span className="top">Hi there,</span>
        It's Eric Ndungutse
      </h1>

      <p className="paragraph">
        I am a JavaScript Full Stack Developer. I use ExpressJS on the backend
        with mongoDB, and ReactJS on frontend. I am passionate about creating
        digital solutions to problems the communinty is facing.
      </p>

      <button className="btn btn--primary btn--big">Learn More</button>
    </div>
  );
};

const ShowcaseImage = () => {
  return (
    <div className="showcase__image--container">
      <img
        src="img/showcaseimage.png"
        className="showcase__image"
        alt="profile image"
      />
    </div>
  );
};

const Showcase = () => {
  return (
    <>
      <ShowcaseIntro />
      <ShowcaseImage />
    </>
  );
};

const showcaseRootNode = document.querySelector("#root");
const showcaseRoot = ReactDOM.createRoot(showcaseRootNode);
showcaseRoot.render(<Showcase />);

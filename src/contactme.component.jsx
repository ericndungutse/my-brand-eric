const Form = () => {
  const [sending, setSending] = React.useState(false);
  const [disable, setDisabled] = React.useState(false);
  const [error, setError] = React.useState({
    type: "",
    message: "",
  });
  const [message, setMessage] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const inputNames = [
    {
      name: "name",
      label: "Name",
      type: "text",
      valMsg: "Name cannot be empty",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      valMsg: "Enter a valid email",
    },
  ];

  const inputs = inputNames.map(({ name, label, type }, index) => {
    return (
      <div className="form-input-group" key={index}>
        <label className="form-input-label">{label}</label>
        <div className="input-icon-container">
          <input
            className="form-input inputInitial"
            type={type}
            onChange={handleChange}
            placeholder="Enter your name..."
            autoComplete="false"
            required
            value={message[name]}
            name={name}
          />
        </div>
      </div>
    );
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setDisabled(() => true);
      setSending((sending) => !sending);
      const res = await fetch("https://ndungutse.onrender.com/api/messages", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const data = await res.json();

      if (data.status !== "success") {
        throw Error(data.message);
      }

      setSending((sending) => !sending);
      setMessage(() => {
        return { name: "", email: "", message: "" };
      });

      setError(() => {
        return { type: "success", message: "Message Sent." };
      });

      setTimeout(() => {
        setError(() => {
          return { type: "", message: "" };
        });
      }, 5000);
    } catch (error) {
      setSending((sending) => !sending);
    }
  }

  return (
    <form className="form contact-me-form" onSubmit={handleSubmit}>
      {error.type.length > 0 && (
        <div className="alert alert--success"> {error.message}</div>
      )}

      <div className="form--header">
        <h2 className="form-title">Reach out to me</h2>
      </div>
      {inputs}
      <div className="form-input-group">
        <label htmlFor="message" className="form-input-label">
          Message
        </label>
        <div className="input-icon-container">
          <textarea
            onChange={handleChange}
            className="form-textarea inputInitial"
            rows={4}
            cols={50}
            placeholder="Enter your message here..."
            required
            name="message"
            value={message.message}
          />
        </div>
      </div>

      <button
        className="btn btn--primary btn--small full-width"
        id="contact-me-btn"
        disabled={
          message.name.length === 0 ||
          !message.email.includes("@") ||
          !message.email.includes(".") ||
          message.message.length === 0 ||
          disable === true
        }
      >
        {sending ? <span className="spinner"></span> : "Send"}
      </button>
    </form>
  );
};

const Intro = () => {
  return (
    <div className="shadow-wrapper">
      <div className="contactme__showcase">
        <h2 className="contact-me__heading">Contact Me</h2>
        <p className="pragraph contact-me__text">
          Need to get in touch with me? Fill the form with your inquiry, the
          response will come in hours.
        </p>
      </div>
    </div>
  );
};

const ContactMe = () => {
  return (
    <>
      <Intro />
      <Form />
    </>
  );
};

const rootNode = document.getElementById("contact-me-root");
const root = ReactDOM.createRoot(rootNode);
root.render(<ContactMe />);

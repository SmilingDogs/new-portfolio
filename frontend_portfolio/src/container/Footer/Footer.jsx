import { useState } from "react";

import images from "../../constants/images";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const FooterContent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (submitError) {
      setSubmitError("");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    const contact = {
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    try {
      // Send contact data to Sanity through a Netlify function
      const sanityResponse = await fetch("/.netlify/functions/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (!sanityResponse.ok) {
        throw new Error(
          `Sanity submit failed with status ${sanityResponse.status}`,
        );
      }
      //send contact data to Make.com webhook for integration with Google sheets
      const response = await fetch(
        "https://hook.eu1.make.com/5c9l4pco1ds331ymswf0k3j0xced6num",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsFormSubmitted(true);
    } catch (err) {
      console.error(err.message);
      setSubmitError(
        "Something went wrong while sending your message. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">It would be nice to hear from you)</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:hello@micael.com" className="p-text">
            a.kudr74@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel:+1 (123) 456-7890" className="p-text">
            +38 (095) 2028054
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <form className="app__footer-form app__flex" onSubmit={handleSubmit}>
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="username"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          {submitError && (
            <p className="app__footer-form-error p-text">{submitError}</p>
          )}
          <button type="submit" className="p-text">
            {!loading ? "Send Message" : "Sending..."}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

const Footer = AppWrap(
  MotionWrap(FooterContent, "app__footer"),
  "contact",
  "app__whitebg",
);

export default Footer;

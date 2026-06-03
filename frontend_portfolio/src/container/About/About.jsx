import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client, urlFor } from "../../client";
import { AppWrap } from "../../wrapper";
import "./About.scss";

const AboutContent = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const aboutsQuery = '*[_type == "abouts"]';

    client.fetch(aboutsQuery).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Web apps</span> <br />
        mean <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const About = AppWrap(AboutContent, "about");

export default About;

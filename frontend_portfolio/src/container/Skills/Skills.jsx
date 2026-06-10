import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";
const experiencesQuery = '*[_type == "experiences"]';
const skillsQuery = '*[_type == "skills"]';

const SkillsContent = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    Promise.all([client.fetch(experiencesQuery), client.fetch(skillsQuery)])
      .then(([experiences, skills]) => {
        setExperiences(experiences);
        setSkills(skills);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill._id}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience._id}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <motion.div
                    key={work._key || work.name}
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tooltip-id="work-tooltip"
                    data-tooltip-content={work.desc}
                  >
                    <h4 className="bold-text">{work.name}</h4>
                    <p className="text-company">{work.company}</p>
                    <p className="p-text">{work.desc}</p>
                  </motion.div>
                ))}
                <Tooltip id="work-tooltip" className="skills-tooltip" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const Skills = AppWrap(
  MotionWrap(SkillsContent, "app__skills"),
  "skills",
  "app__whitebg",
);

export default Skills;

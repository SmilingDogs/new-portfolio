import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Testimonial.scss";
const testimonialsQuery = '*[_type == "testimonials"]';
const brandsQuery = '*[_type == "brands"]';

const TestimonialContent = () => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleClick = (newIndex) => {
    if (newIndex === 0 && currentIndex === testimonials.length - 1) {
      setDirection(1);
    } else if (newIndex === testimonials.length - 1 && currentIndex === 0) {
      setDirection(-1);
    } else {
      setDirection(newIndex > currentIndex ? 1 : -1);
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    Promise.all([client.fetch(testimonialsQuery), client.fetch(brandsQuery)])
      .then(([testimonialsData, brandsData]) => {
        setTestimonials(testimonialsData);
        setBrands(brandsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      {testimonials.length && (
        <>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "tween", duration: 0.2, ease: "easeInOut" },
                  opacity: { duration: 0.2, ease: "easeInOut" },
                }}
                className="app__testimonial-item app__flex"
              >
                <img
                  src={urlFor(testimonials[currentIndex].imgurl)}
                  alt={testimonials[currentIndex].name}
                />
                <div className="app__testimonial-content">
                  <p className="p-text">
                    {testimonials[currentIndex].feedback}
                  </p>
                  <div>
                    <h4 className="bold-text">
                      {testimonials[currentIndex].name}
                    </h4>
                    <h5 className="p-text">
                      {testimonials[currentIndex].company}
                    </h5>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1,
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1,
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

const Testimonial = AppWrap(
  MotionWrap(TestimonialContent, "app__testimonial"),
  "testimonial",
  "app__primarybg",
);

export default Testimonial;

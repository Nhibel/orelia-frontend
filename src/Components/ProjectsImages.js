import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { InView } from "react-intersection-observer";

const ProjectsImages = (props) => {
  const { image, projet, navigateToProject, handleImageLoaded } = props;

  const imgRef = useRef();

  return (
    <InView triggerOnce={false}>
      {({ inView, ref, entry }) => (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{
            opacity: inView ? 1 : 0,
          }}
          transition={{ duration: 1 }} // Adjust as needed
          exit={{ opacity: 0 }}
          key={image.idImage}
        >
          <div
            ref={ref}
            style={{ cursor: "pointer" }}
            onClick={() => navigateToProject(projet.id, projet)}
          >
            <figure className="fig-hover-effect">
              <img ref={imgRef} src={image.url} onLoad={handleImageLoaded} />
              <figcaption>
                <h2 style={{ fontWeight: "300" }}>{projet.title}</h2>
                <p style={{ fontSize: "20px", fontWeight: "700" }}>
                  {projet.type}
                </p>
              </figcaption>
            </figure>
          </div>
        </motion.div>
      )}
    </InView>
  );
};
export default ProjectsImages;

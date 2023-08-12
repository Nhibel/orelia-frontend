import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

function ProjectsImages(props) {
  const { image, projet, navigateToProject, handleImageLoaded } = props;

  const imgRef = useRef();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        navigateToProject(projet.id, projet);
      }
    },
    [navigateToProject, projet]
  );

  return (
    <InView triggerOnce={false}>
      {({ inView, ref }) => (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          key={image.idImage}
        >
          <div
            ref={ref}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex="0"
            onClick={() => navigateToProject(projet.id, projet)}
            onKeyDown={handleKeyDown}
          >
            <figure className="fig-hover-effect">
              <img
                ref={imgRef}
                src={image.url}
                onLoad={handleImageLoaded}
                alt={image.name}
              />
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
}

export default ProjectsImages;

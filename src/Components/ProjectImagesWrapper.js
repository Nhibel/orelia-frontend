import { AnimatePresence } from "framer-motion";
import ProjectsImages from "./ProjectsImages";

function ProjectImagesWrapper({
  projet,
  navigateToProject,
  handleImageLoaded,
}) {
  return (
    <div key={projet.id}>
      <AnimatePresence>
        {projet.images.map(
          (image) =>
            image.idImage === projet.idImageThumbnail && (
              <ProjectsImages
                image={image}
                projet={projet}
                navigateToProject={navigateToProject}
                handleImageLoaded={handleImageLoaded}
                key={image.idImage}
              />
            )
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectImagesWrapper;

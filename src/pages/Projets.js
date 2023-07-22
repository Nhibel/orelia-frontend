import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProjetContext from "../contexts/projetContext";
import ProjectsImages from "../Components/ProjectsImages";
import { CircularProgress } from "react-cssfx-loading";

export default function Projets() {
  const { projets, setProjets } = useContext(ProjetContext);
  const navigate = useNavigate();

  const navigateToProject = (number, projet) => {
    navigate(`/projets/${number}`, { state: { projet: projet } });
  };

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = projets.length;

  const handleImageLoaded = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  return (
    <>
      <div className="gallery-container contenu">
        {imagesLoaded !== totalImages && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)", // example of a semi-transparent background
            }}
          >
            <CircularProgress
              color="rgba(153,8,79,1)"
              width="50px"
              height="50px"
            />
          </div>
        )}
        <div
          className="images-container"
          style={{
            visibility: imagesLoaded === totalImages ? "visible" : "hidden",
          }}
        >
          {projets.map((projet) => (
            <div key={projet.id}>
              <AnimatePresence>
                {projet.images.map((image) => {
                  return (
                    image.idImage === projet.idImageThumbnail && (
                      <ProjectsImages
                        image={image}
                        projet={projet}
                        navigateToProject={navigateToProject}
                        handleImageLoaded={handleImageLoaded}
                      />
                    )
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

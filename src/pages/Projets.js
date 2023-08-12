import { useContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProjetContext from "../contexts/projetContext";
import LoadingOverlay from "../Components/LoadingOverlay";
import ImagesContainer from "../Components/ImagesContainer";
import ProjectImagesWrapper from "../Components/ProjectImagesWrapper";

export default function Projets() {
  const { projets } = useContext(ProjetContext);
  const navigate = useNavigate();

  const navigateToProject = useCallback(
    (number, projet) => {
      navigate(`/projets/${number}`, { state: { projet } });
    },
    [navigate]
  );

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = projets.length;

  const handleImageLoaded = useCallback(() => {
    setImagesLoaded((prev) => prev + 1);
  }, []);

  return (
    <div className="gallery-container contenu">
      {imagesLoaded !== totalImages && <LoadingOverlay />}
      <ImagesContainer loaded={imagesLoaded === totalImages}>
        {projets.map((projet) => (
          <ProjectImagesWrapper
            key={projet.id}
            projet={projet}
            navigateToProject={navigateToProject}
            handleImageLoaded={handleImageLoaded}
          />
        ))}
      </ImagesContainer>
    </div>
  );
}

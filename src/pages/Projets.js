import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProjetService from "../services/projet.service";
import { AnimatePresence, motion } from "framer-motion";
import ProjetContext from "../contexts/projetContext";

export default function Projets() {
  const { projets, setProjets } = useContext(ProjetContext);
  const navigate = useNavigate();

  const navigateToProject = (number, projet) => {
    navigate(`/projets/${number}`, { state: { projet: projet } });
  };

  return (
    <>
      <div className="gallery-container contenu">
        <div className="images-container">
          {projets.map((projet) => (
            <div key={projet.id}>
              <AnimatePresence>
                {projet.images.map((image) => {
                  {
                    return (
                      image.idImage === projet.idImageThumbnail && (
                        <motion.div
                          layout
                          initial={{ transform: "scale(0)" }}
                          animate={{ transform: "scale(1)" }}
                          exit={{ transform: "scale(0)" }}
                          key={image.idImage}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigateToProject(projet.id, projet);
                            }}
                          >
                            <figure className="fig-hover-effect">
                              <img src={image.url} />
                              <figcaption>
                                <h2
                                  style={{
                                    fontWeight: "300",
                                  }}
                                >
                                  {projet.title}
                                </h2>
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {projet.type}
                                </p>
                              </figcaption>
                            </figure>
                          </div>
                        </motion.div>
                      )
                    );
                  }
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjetService from "../services/projet.service";
import { AnimatePresence, motion } from "framer-motion";

export default function Projets() {
  const [projets, setProjets] = useState([]);
  const [allProjets, setAllProjets] = useState([]);
  const [key, setKey] = useState(new Date());
  const navigate = useNavigate();
  const [active, setActive] = useState("all");

  useEffect(() => {
    ProjetService.getProjets().then((res) => {
      setProjets(res.data.data);
      setAllProjets(res.data.data);
    });
  }, []);

  const navigateToProject = (number, projet) => {
    navigate(`/projets/${number}`, { state: projet });
  };

  const filterSelection = (e) => {
    setActive(e.target.id);
    if (e.target.id === "all") {
      setProjets(allProjets);
    } else {
      const filter = allProjets.filter((projet) => {
        return projet.type === e.target.id;
      });
      setProjets(filter);
      setKey(new Date());
    }
  };

  return (
    <>
      <div className="gallery-container contenu">
        <div className="menu-projets d-flex justify-content-center mb-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            id="all"
            className={`mx-3 p-2 menu-projets-btn rounded-pill shadow-sm
            ${active === "all" ? "active" : ""}`}
            onClick={(e) => filterSelection(e)}
          >
            Tous les projets
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            id="Illustration"
            className={`mx-3 p-2 menu-projets-btn rounded-pill shadow-sm
            ${active === "Illustration" ? "active" : ""}`}
            onClick={(e) => filterSelection(e)}
          >
            Illustrations
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            id="Graphisme"
            className={`mx-3 p-2 menu-projets-btn rounded-pill shadow-sm
            ${active === "Graphisme" ? "active" : ""}`}
            onClick={(e) => filterSelection(e)}
          >
            Graphisme
          </motion.div>
        </div>
        <div className="images-container" key={key}>
          {projets.map((projet) => (
            <div>
              <AnimatePresence>
                {projet.images.map((image, index) => {
                  {
                    return (
                      image.idImage === projet.idImageThumbnail && (
                        <motion.div
                          key={index}
                          layout
                          initial={{ transform: "scale(0)" }}
                          animate={{ transform: "scale(1)" }}
                          exit={{ transform: "scale(0)" }}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigateToProject(projet.id, projet);
                            }}
                          >
                            <figure className="fig-hover-effect">
                              <img src={image.thumbUrl} />
                              <figcaption>
                                <h2>{projet.title}</h2>
                                <p>{projet.type}</p>
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

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProjetService from "../services/projet.service";

export default function Projet() {
  const { slug } = useParams();

  const [projet, setProjet] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ProjetService.getProjetById(slug).then((result) => {
      setProjet(result.data.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-center contenu">
        <div
          className="d-flex align-items-center flex-column bd-highlight mb-2"
          style={{ width: "85%", textAlign: "center", whiteSpace: "pre-wrap" }}
        >
          <h1 className="mt-3 mb-4">{projet.title}</h1>
          <p>{projet.richText}</p>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        <AnimatePresence>
          {projet.images &&
            projet.images.map((image, index) => (
              <motion.div
                key={index}
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                exit={{ transform: "scale(0)" }}
              >
                <div key={index}>
                  <img
                    className="m-5 mt-1 shadow-lg"
                    src={image.url}
                    alt=""
                    style={{
                      height: "65vh",
                      borderRadius: "15px",
                      border: "1rem solid white",
                    }}
                  />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </>
  );
}

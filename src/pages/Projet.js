import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import ProjetService from "../services/projet.service";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function Projet() {
  const { slug } = useParams();
  const location = useLocation();

  const [projet, setProjet] = useState();
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Si le state contient les données du projet, utilisez-les
    if (location.state && location.state.projet) {
      setProjet(location.state.projet);
      setLoading(false);
    }
    // Sinon, faites un appel API pour obtenir les données du projet
    else {
      ProjetService.getProjetById(slug)
        .then((result) => {
          setProjet(result.data.data);
          setLoading(false);
        })
        .catch((error) => {
          error.response.data.messages.map((error) => {
            toast.error(error.message + ". Retour sur la page projets");
            setTimeout(() => navigate(`/Projets`), 2000);
          });
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-center contenu flex-column">
        <div
          className="d-flex align-items-center flex-column bd-highlight mb-2"
          style={{
            textAlign: "center",
            whiteSpace: "pre-wrap",
          }}
        >
          <h1 className="mb-4">{projet.title}</h1>
          <p>{projet.richText}</p>
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
                      className="m-5 mt-1 img-projet"
                      src={image.url}
                      alt=""
                      style={{
                        height: "65vh",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

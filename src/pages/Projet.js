import { useEffect, useState } from "react";
import axios from "axios";
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
      <div className="d-flex justify-content-center">
        <div
          className="d-flex align-items-center flex-column bd-highlight mb-2 mt-3"
          style={{ width: "85%", textAlign: "center" }}
        >
          <h1 className="mt-3 mb-4">{projet.title}</h1>
          <p>{projet.richText}</p>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {projet.images &&
          projet.images.map((image, index) => (
            <div key={index}>
              <img
                className="m-3 mt-1 shadow-lg"
                src={image.url}
                alt=""
                style={{ height: "65vh", borderRadius: "15px" }}
              />
            </div>
          ))}
      </div>
    </>
  );
}

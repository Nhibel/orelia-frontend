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
      <h1 className="mt-3">{projet.title}</h1>
      <p>{projet.richText}</p>

      <div className="d-flex justify-content-around">
        {projet.images &&
          projet.images.map((image, index) => (
            <div key={image.idImage} style={{ listStyleType: "none" }}>
              <img src={image.thumbUrl} alt="" style={{ maxHeight: "350px" }} />
            </div>
          ))}
      </div>
    </>
  );
}

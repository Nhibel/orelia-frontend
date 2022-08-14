import { useEffect, useState } from "react";
import axios from "axios";
import { ProjetModel } from "../models/ProjetModel";
import { useParams } from "react-router-dom";

export default function Projet() {
  const monProjet = new ProjetModel();
  const { slug } = useParams();

  const [projet, setProjet] = useState(monProjet);

  useEffect(() => {
    axios.get(`/projets/${slug}`).then((res) => {
      setProjet(res.data.data);
    });
  }, []);

  return (
    <>
      <p className="h1">{projet.title}</p>
      {projet.images &&
        projet.images.map((image) => (
          <div key={image.idImage} style={{ listStyleType: "none" }}>
            <p>{image.projetsId}</p>
          </div>
        ))}
      <div dangerouslySetInnerHTML={{ __html: projet.richText }} />
    </>
  );
}

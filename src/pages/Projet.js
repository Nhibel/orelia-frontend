import { useEffect, useState } from "react";
import axios from "axios";
import { ProjetModel } from "../models/ProjetModel";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Projet() {
  const { slug } = useParams();
  const location = useLocation();

  const [projet, setProjet] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setProjet(location.state);
      setLoading(false);
    } else {
      axios.get(`/projets/${slug}`).then((result) => {
        setProjet(result.data.data);
        setLoading(false);
      });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <p className="h1">{projet.title}</p>
      {projet.images &&
        projet.images.map((image) => (
          <div key={image.idImage} style={{ listStyleType: "none" }}>
            <p>{image.projetsId}</p>
            <img src={image.location} alt="" />
          </div>
        ))}
      <div dangerouslySetInnerHTML={{ __html: projet.richText }} />
    </>
  );
}

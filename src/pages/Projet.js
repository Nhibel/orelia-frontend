import { useEffect, useState } from "react";
import axios from "axios";
import { ProjetModel } from "../models/projetModel";
import { useParams } from "react-router-dom";

export default function Projet() {
  const monProjet = new ProjetModel();
  const { slug } = useParams();

  const [projet, setProjet] = useState(monProjet);

  useEffect(() => {
    axios.get(`/projets/projet/${slug}`).then((res) => {
      setProjet(res.data.data);
    });
  }, []);

  return (
    <>
      <p className="h1">{projet.title}</p>
      <div dangerouslySetInnerHTML={{ __html: projet.richText }} />
    </>
  );
}

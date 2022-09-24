import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjetService from "../services/projet.service";

export default function Projets() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ProjetService.getProjets().then((res) => {
      setProjets(res.data.data);
    });
  }, []);

  const navigateToProject = (number, projet) => {
    navigate(`/projets/${number}`, { state: projet });
  };

  return (
    <>
      {projets.map((projet) => (
        <div key={projet.id} style={{ listStyleType: "none" }}>
          {projet.images.map(
            (image) =>
              image.idImage === projet.idImageThumbnail && (
                <div
                  onClick={() => navigateToProject(projet.id, projet)}
                  className="mt-3"
                >
                  <img src={image.thumbUrl} style={{ height: "350px" }}></img>
                  <h2>{projet.title}</h2>
                </div>
              )
          )}
        </div>
      ))}
    </>
  );
}

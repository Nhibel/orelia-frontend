import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Projets() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/projets/all`).then((res) => {
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

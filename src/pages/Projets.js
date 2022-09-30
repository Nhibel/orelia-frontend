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
      <div className="gallery-container">
        <div className="images-container">
          {projets.map((projet) => (
            <div>
              {projet.images.map((image) => {
                {
                  return (
                    image.idImage === projet.idImageThumbnail && (
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigateToProject(projet.id, projet);
                        }}
                      >
                        <figure class="fig-hover-effect">
                          <img src={image.thumbUrl} />
                          <figcaption>
                            <h2>{projet.title}</h2>
                            <p>{projet.type}</p>
                          </figcaption>
                        </figure>
                      </div>
                    )
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>

      {/* {projets.map((projet) => (
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
      ))} */}
    </>
  );
}

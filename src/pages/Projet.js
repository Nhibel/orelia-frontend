import { useEffect, useState } from "react";
import axios from "axios";
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

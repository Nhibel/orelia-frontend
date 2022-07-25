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

  const navigateToProject = (number) => {
    navigate(`/projets/${number}`);
  };

  return (
    <>
      {projets.map((projet) => (
        <div key={projet.id} style={{ listStyleType: "none" }}>
          <Button onClick={() => navigateToProject(projet.id)}>
            {projet.title}
          </Button>
        </div>
      ))}
    </>
  );
}

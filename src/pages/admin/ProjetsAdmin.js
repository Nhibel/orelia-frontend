import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function ProjetsAdmin() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user != null) {
      setShowPage(true);
      axios.get(`/projets/all`).then((res) => {
        setProjets(res.data.data);
      });
    }
  }, []);

  const navigateToProject = (number, projet) => {
    navigate(`/projetAdmin/${number}`, { state: projet });
  };

  const navigateToImages = () => {
    navigate(`/admin/images`);
  };

  return (
    <>
      {showPage ? (
        <div>
          <button
            onClick={() => navigateToImages()}
            type="button"
            className="mb-3"
          >
            Images
          </button>
          <div className="list-group">
            {projets.map((projet) => (
              <button
                onClick={() => navigateToProject(projet.id, projet)}
                type="button"
                className="list-group-item list-group-item-action"
                key={projet.id}
              >
                {projet.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center flex-column">
          <p className="h1 text-center mt-5 pb-3">
            Vous n'avez pas accès à cette page
          </p>
          <img
            src="https://media4.giphy.com/media/3ohzdQ1IynzclJldUQ/giphy.gif?cid=ecf05e4758d1pqmze46hg1fpd8xi7hj4wf1vp47xoek4ay2n&rid=giphy.gif&ct=g"
            alt=""
          />
        </div>
      )}
    </>
  );
}

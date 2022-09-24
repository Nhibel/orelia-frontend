import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import ProjetService from "../../services/projet.service";

export default function ProjetsAdmin() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user != null) {
      setShowPage(true);
      ProjetService.getProjets().then((res) => {
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
        <div className="mt-3">
          <div className="mb-3 d-flex justify-content-evenly">
            <Button onClick={() => navigateToImages()} type="button">
              Ajouter un projet
            </Button>
            <Button onClick={() => navigateToImages()} type="button">
              Ajouter un article
            </Button>
            <Button onClick={() => navigateToImages()} type="button">
              Gestion des images
            </Button>
          </div>

          <Row>
            <Col>
              <Card>
                <Card.Header>liste des articles</Card.Header>
                <ListGroup variant="flush"></ListGroup>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>liste des projets</Card.Header>
                <ListGroup variant="flush">
                  {projets.map((projet) => (
                    <ListGroup.Item
                      onClick={() => navigateToProject(projet.id, projet)}
                      type="button"
                      className="list-group-item-action"
                      key={projet.id}
                    >
                      {projet.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          </Row>
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

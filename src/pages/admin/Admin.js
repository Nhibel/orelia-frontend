import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import ProjetService from "../../services/projet.service";
import ArticleService from "../../services/article.service";

export default function Admin() {
  const [projets, setProjets] = useState([]);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Afficher Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [modalInfo, setModalInfo] = useState();

  // Permet de mettre à jour la sélection d'image
  const [key, setKey] = useState(new Date());

  useEffect(() => {
    ProjetService.getProjets().then((res) => {
      setProjets(res.data.data);
    });
    ArticleService.getArticles().then((res) => {
      setArticles(res.data.data);
    });
  }, []);

  const reloadProjets = () => {
    ProjetService.getProjets().then((res) => {
      setProjets(res.data.data);
    });
  };

  const navigateToProject = (number) => {
    navigate(`/projetAdmin/${number}`);
  };

  const navigateToArticle = (title) => {
    navigate(`/articleAdmin/${title}`);
  };

  const navigateToImages = () => {
    navigate(`/admin/images`);
  };

  const navigateToAjouterProjet = () => {
    navigate(`/admin/ajout-projet`);
  };

  const navigateToAjouterArticle = () => {
    navigate(`/admin/ajout-article`);
  };

  const openModalSupprimerProjet = (idProjet, title) => {
    setModalInfo({ idProjet, title });
    setShow(true);
  };

  const supprimerProjet = (idProjet) => {
    ProjetService.supprimerProjet(idProjet).then((res) => {
      setShow(false);
      toast.success(res.data.data);
      reloadProjets();
      setKey(new Date());
    });
  };

  return (
    <div className="contenu">
      {modalInfo && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Supprimer projet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Êtes-vous sur de vouloir supprimer le projet : {modalInfo.title} ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => supprimerProjet(modalInfo.idProjet)}
            >
              Supprimer
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <div className="mt-3">
        <div className="mb-3 d-flex justify-content-evenly">
          <Button onClick={() => navigateToAjouterProjet()} type="button">
            Ajouter un projet
          </Button>
          <Button onClick={() => navigateToAjouterArticle()} type="button">
            Ajouter un article
          </Button>
          <Button onClick={() => navigateToImages()} type="button">
            Gestion des images
          </Button>
        </div>

        <Row>
          <Col>
            <Card>
              <Card.Header>Liste des articles</Card.Header>
              {articles.map((article) => (
                <div
                  className="d-flex justify-content-between p-2 border"
                  key={article.idArticle}
                >
                  <button
                    type="button"
                    className="mr-auto p-1"
                    onClick={() => navigateToArticle(article.section)}
                  >
                    {article.section}
                  </button>
                </div>
              ))}
            </Card>
          </Col>
          <Col key={key}>
            <Card>
              <Card.Header>Liste des projets</Card.Header>
              {[...projets]
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((projet) => (
                  <div
                    className="d-flex justify-content-between p-2 border"
                    key={projet.id}
                  >
                    <button
                      type="button"
                      className="mr-auto p-1"
                      onClick={() => navigateToProject(projet.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {projet.title}
                    </button>
                    <div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          openModalSupprimerProjet(projet.id, projet.title)
                        }
                      >
                        Supprimer projet
                      </Button>
                    </div>
                  </div>
                ))}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

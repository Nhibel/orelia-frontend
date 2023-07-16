import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalAjouterImage from "../../Components/ModalAjouterImage";
import ModalRetirerImage from "../../Components/ModalRetirerImages";
import { Card } from "react-bootstrap";
import toast from "react-hot-toast";
import ProjetService from "../../services/projet.service";

export default function ProjetAdmin() {
  const { slug } = useParams();

  const [projet, setProjet] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setLoading] = useState(true);

  // Permet de mettre à jour la sélection d'image
  const [key, setKey] = useState(new Date());

  const [openModalAjoutImage, setOpenModalAjoutImage] = useState(false);
  const [openModalRetirerImage, setOpenModalRetirerImage] = useState(false);

  const navigate = useNavigate();

  const optionSelect = ["Illustration", "Graphisme", "Maquette"];

  useEffect(() => {
    loadProjet();
  }, []);

  const loadProjet = () => {
    ProjetService.getProjetById(slug).then((res) => {
      setProjet(res.data.data);
      setTitle(res.data.data.title);
      setLoading(false);
    });
  };

  const reLoadProjet = async () => {
    await ProjetService.getProjetById(slug).then((res) => {
      setProjet(res.data.data);
    });
    setKey(new Date());
  };

  const handleTitleChange = (e) => {
    setProjet((projet) => ({
      ...projet,
      title: e.target.value,
    }));
  };

  const handleTypeSelect = (e) => {
    setProjet((projet) => ({
      ...projet,
      type: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setProjet((projet) => ({
      ...projet,
      richText: e.target.value,
    }));
  };

  const handleImageSelect = async (idImage) => {
    await ProjetService.gererImageEnValeur(projet.id, idImage, projet)
      .then((res) => {
        setProjet(res.data.data);
        toast.success("Image mise en valeur avec succès !");
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.statusCode === 403) {
            toast.error("Token expiré, veuillez-vous reconnecter.");
          } else {
            toast.error("Erreur lors du changement d'image en valeur");
          }
        }
      });
    reLoadProjet();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProjetService.updateProjet(projet)
      .then((res) => {
        toast.success("Projet mis à jour avec succès !");
        setProjet(res.data.data);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.statusCode === 403) {
            toast.error(
              "Token expiré, redirection vers l'écran de connection..."
            );
            setTimeout(() => navigate(`/login/`), 3000);
          } else {
            toast.error("Erreur lors de la mise à jour du projet");
          }
        }
      });
  };

  const handleRemoveImage = async (idImage) => {
    let newArr = [idImage];
    await ProjetService.removeImageProjet(projet.id, newArr);
    reLoadProjet();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contenu">
      <h2 className="mt-2 mb-4">Modifier le projet {title}</h2>

      <Button
        onClick={() => {
          setOpenModalAjoutImage(true);
        }}
        style={{ marginRight: "10px" }}
      >
        Ajouter Images
      </Button>

      {openModalAjoutImage && (
        <ModalAjouterImage
          closeModal={setOpenModalAjoutImage}
          show={openModalAjoutImage}
          idProjet={projet.id}
          reloadImagesFunc={reLoadProjet}
          projetImages={projet.images}
        />
      )}

      <Button
        onClick={() => {
          setOpenModalRetirerImage(true);
        }}
      >
        Retirer Images
      </Button>

      {openModalRetirerImage && (
        <ModalRetirerImage
          closeModal={setOpenModalRetirerImage}
          show={openModalRetirerImage}
          idProjet={projet.id}
          reloadImagesFunc={reLoadProjet}
          projetImages={projet.images}
        />
      )}

      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Row>
          <Col md={12}>
            <Row>
              <Col md={5}>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>
                    <h5>Titre du projet :</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indiquer le titre du projet"
                    value={projet.title}
                    required
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    <h5>Type du projet :</h5>
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      handleTypeSelect(e);
                    }}
                    value={projet.type}
                  >
                    {optionSelect.map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    <h5>Descriptif du projet :</h5>
                  </Form.Label>
                  <Form.Control
                    rows={8}
                    as="textarea"
                    placeholder="Indiquer le descriptif du projet"
                    value={projet.richText}
                    onChange={(e) => {
                      handleContentChange(e);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>

              <Col md={7}>
                <Row>
                  <Col md={12}>
                    <h5>Images du projet</h5>
                  </Col>
                </Row>
                <Row>
                  <Col className="g-2 pt-2 d-flex flex-row flex-wrap" key={key}>
                    <Row
                      xs={2}
                      md={5}
                      className="g-4"
                      style={{ width: "100%" }}
                    >
                      {[...projet.images]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((image, index) => (
                          <Col className="m-2" key={image.idImage}>
                            <Card key={index}>
                              <Card.Img
                                variant="top"
                                src={image.thumbUrl}
                                style={{
                                  maxHeight: "200px",
                                  objectFit: "cover",
                                  objectPosition: "50% 40%",
                                }}
                              />
                              <Card.Body>
                                <Card.Title
                                  style={{
                                    textOverflow: "ellipsis",
                                    width: "auto",
                                    display: "block",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    fontSize: "18px",
                                  }}
                                >
                                  {image.name.substring(
                                    0,
                                    image.name.lastIndexOf(".")
                                  )}
                                </Card.Title>
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleImageSelect(image.idImage)
                                  }
                                  variant={
                                    image.idImage === projet.idImageThumbnail
                                      ? "success"
                                      : "primary"
                                  }
                                  style={{
                                    marginRight: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {image.idImage === projet.idImageThumbnail
                                    ? "En valeur"
                                    : "Mettre en valeur"}
                                </Button>
                                <Button
                                  style={{
                                    fontSize: "12px",
                                  }}
                                  size="sm"
                                  variant="danger"
                                  onClick={() =>
                                    handleRemoveImage(image.idImage)
                                  }
                                >
                                  Retirer
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

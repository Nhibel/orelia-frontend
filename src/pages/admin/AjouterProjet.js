import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalAjouterImage from "../../Components/ModalAjouterImage";
import { Card } from "react-bootstrap";
import ProjetService from "../../services/projet.service";
import ImageService from "../../services/image.service";
import { useNavigate } from "react-router-dom";

export default function AjouterProjet() {
  const [projet, setProjet] = useState();
  const [isLoading, setLoading] = useState(false);
  const [openModalAjoutImage, setOpenModalAjoutImage] = useState(false);
  const [selectionImages, setSelectionImage] = useState([]);
  const [selectionImageToShow, setSelectionImageToShow] = useState([]);
  const [images, setImages] = useState();

  // Permet de mettre à jour la sélection d'image
  const [key, setKey] = useState(new Date());

  const optionSelect = ["Illustration", "Graphisme", "Maquette"];

  let navigate = useNavigate();

  useEffect(() => {
    if (images) {
      const compareIdImages = images.filter((image) =>
        selectionImages.includes(image.idImage.toString())
      );
      setProjet((projet) => ({
        ...projet,
        images: compareIdImages,
      }));
      setSelectionImageToShow(compareIdImages);
      setKey(new Date());
    }
  }, [images]);

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

  const handleImageEnValeur = (idImage) => {
    setProjet((projet) => ({
      ...projet,
      idImageThumbnail: idImage,
    }));
  };

  const handleRetirerImage = (idImage) => {
    const arrCopy = Array.from(projet.images);
    const objWithIdIndex = arrCopy.findIndex((obj) => obj.idImage === idImage);
    arrCopy.splice(objWithIdIndex, 1);
    setProjet((projet) => ({
      ...projet,
      images: arrCopy,
    }));
    setSelectionImageToShow(arrCopy);
    setKey(new Date());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProjetService.ajouterProjet(projet).then((res) => {
      const result = res.data.data;
      navigate(`/projetAdmin/${result.id}`);
    });
  };

  const getImages = async () => {
    await ImageService.getImages().then((res) => {
      setImages(res.data.data);
    });
  };

  const updateSelectedImages = async () => {
    getImages();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contenu">
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
          //idProjet={projet.id}
          //reloadImagesFunc={reLoadProjet}
          //projetImages={projet.images}
          type={"creation"}
          selectionImage={setSelectionImage}
          updateImagesFunc={updateSelectedImages}
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
              <Col md={6}>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>
                    <h5>Titre du projet :</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indiquer le titre du projet"
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
                  >
                    <option key="blankChoice" hidden value>
                      Choisir le type de projet
                    </option>
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
                    onChange={(e) => {
                      handleContentChange(e);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>

              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <h5>Images du projet</h5>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="g-2 pt-2 d-flex flex-row flex-wrap overflow-auto"
                    key={key}
                  >
                    {selectionImageToShow != "" ? (
                      [...selectionImageToShow]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((image, index) => (
                          <Col className="m-2" key={index} md={3}>
                            <Card style={{ width: "100%" }}>
                              <Card.Img
                                variant="top"
                                src={image.thumbUrl}
                                style={{
                                  maxHeight: "220px",
                                  objectFit: "cover",
                                  objectPosition: "50% 40%",
                                }}
                              />
                              <Card.Body>
                                <Card.Title
                                  style={{
                                    textOverflow: "ellipsis",
                                    width: "200px",
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
                                    handleImageEnValeur(image.idImage)
                                  }
                                  variant={
                                    projet.idImageThumbnail &&
                                    image.idImage === projet.idImageThumbnail
                                      ? "success"
                                      : "primary"
                                  }
                                  style={{ marginRight: "5px" }}
                                >
                                  {projet.idImageThumbnail &&
                                  image.idImage === projet.idImageThumbnail
                                    ? "En valeur"
                                    : "Mettre en valeur"}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() =>
                                    handleRetirerImage(image.idImage)
                                  }
                                >
                                  Retirer
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                    ) : (
                      <p>Pas d'images sélectionnées</p>
                    )}
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

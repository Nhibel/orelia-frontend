import { useEffect, useState, useRef, Component } from "react";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalAjouterImage from "../../Components/ModalAjouterImage";
import ModalRetirerImage from "../../Components/ModalRetirerImages";
import { Card } from "react-bootstrap";

export default function ProjetAdmin() {
  const { slug } = useParams();

  const [projet, setProjet] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setLoading] = useState(true);

  // Permet de mettre à jour la sélection d'image
  const [key, setKey] = useState(new Date());

  const [openModalAjoutImage, setOpenModalAjoutImage] = useState(false);
  const [openModalRetirerImage, setOpenModalRetirerImage] = useState(false);

  useEffect(() => {
    loadProjet();
  }, []);

  const loadProjet = () => {
    axios.get(`/projets/${slug}`).then((res) => {
      setProjet(res.data.data);
      console.log("projet : ", res.data.data);
      setTitle(res.data.data.title);
      setLoading(false);
    });
  };

  const reLoadProjet = async () => {
    await axios.get(`/projets/${slug}`).then((res) => {
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

  const handleContentChange = (e) => {
    setProjet((projet) => ({
      ...projet,
      richText: e.target.value,
    }));
  };

  const handleImageSelect = (idImage) => {
    setProjet((projet) => ({
      ...projet,
      idImageThumbnail: idImage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/projets/`, projet, {
        headers: authHeader(),
      })
      .then((res) => {
        setProjet(res.data.data);
      });
  };

  const handleRemoveImage = async (idImage) => {
    let newArr = [idImage];
    await axios.put(
      `http://localhost:8080/projets/${projet.id}/remove/images`,
      newArr,
      {
        headers: authHeader(),
      }
    );
    reLoadProjet();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          <Col xs="12" md="6">
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Titre du projet :</Form.Label>
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
              <Form.Label>Descriptif du projet :</Form.Label>
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
          </Col>
          <Col
            xs={1}
            md={6}
            className="g-4 d-flex flex-row flex-wrap overflow-auto"
            style={{ height: "500px" }}
            key={key}
          >
            {[...projet.images]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((image, index) => (
                <Col xs={12} md={4} className="p-2" key={index}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={image.thumbUrl}
                      style={{
                        maxHeight: "150px",
                        maxWidth: "100%",
                        objectFit: "cover",
                        objectPosition: "50% 40%",
                      }}
                    />
                    <Card.Body>
                      <Card.Title
                        style={{
                          textOverflow: "ellipsis",
                          width: "100%",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {image.name.substring(0, image.name.lastIndexOf("."))}
                      </Card.Title>
                      <Button
                        onClick={() => handleImageSelect(image.idImage)}
                        variant={
                          image.idImage == projet.idImageThumbnail
                            ? "success"
                            : "primary"
                        }
                        size="sm"
                        style={{ marginRight: "5px" }}
                      >
                        {image.idImage == projet.idImageThumbnail
                          ? "En valeur"
                          : "Mettre en valeur"}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveImage(image.idImage)}
                      >
                        Retirer
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6"></Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </>
  );
}

import { useState } from "react";
import { useEffect } from "react";
import ArticleService from "../services/article.service";
import ModalAjouterImageArticle from "../Components/ModalAjouterImageArticle";
import ModalRetirerImageArticle from "../Components/ModalRetirerImageArticle";
import toast, { Toaster } from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

export default function ModifierArticle({ slug }) {
  const [article, setArticle] = useState();
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [key, setKey] = useState(new Date());
  const [openModalAjoutImageArticle, setOpenModalAjoutImageArticle] =
    useState(false);

  const [openModalRetirerImageArticle, setOpenModalRetirerImageArticle] =
    useState(false);

  useEffect(() => {
    loadArticle();
  }, []);

  const loadArticle = () => {
    ArticleService.getArticlesBySectionName(slug).then((res) => {
      setArticle(res.data.data);
      setTitle(res.data.data.title);
      setLoading(false);
    });
  };

  const reLoadArticle = async () => {
    await ArticleService.getArticlesBySectionName(slug).then((res) => {
      setArticle(res.data.data);
    });
    setKey(new Date());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ArticleService.updateArticle(article)
      .then((res) => {
        toast.success("Article mis à jour avec succès !");
        setArticle(res.data.data);
      })
      .catch(function (error) {
        if (error.response) {
          toast.error("Erreur lors de la mise à jour de l'article");
        }
      });
  };

  const handleTitleChange = (e) => {
    setArticle((article) => ({
      ...article,
      title: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setArticle((article) => ({
      ...article,
      richText: e.target.value,
    }));
  };

  const handleRemoveImage = async (idImage) => {
    let newArr = [idImage];
    await ArticleService.removeImageArticle(article.idArticle, newArr);
    reLoadArticle();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="mt-2 mb-4">Modifier l'article {title}</h2>

      <Button
        onClick={() => {
          setOpenModalAjoutImageArticle(true);
        }}
        style={{ marginRight: "10px" }}
      >
        Ajouter Images
      </Button>

      {openModalAjoutImageArticle && (
        <ModalAjouterImageArticle
          closeModal={setOpenModalAjoutImageArticle}
          show={openModalAjoutImageArticle}
          idArticle={article.idArticle}
          reloadImagesFunc={reLoadArticle}
        />
      )}

      <Button
        onClick={() => {
          setOpenModalRetirerImageArticle(true);
        }}
      >
        Retirer Images
      </Button>

      {openModalRetirerImageArticle && (
        <ModalRetirerImageArticle
          closeModal={setOpenModalRetirerImageArticle}
          show={openModalRetirerImageArticle}
          idArticle={article.idArticle}
          reloadImagesFunc={reLoadArticle}
          articleImages={article.images}
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
                    <h5>Titre de l'article :</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indiquer le titre de l'article"
                    value={article.title}
                    required
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    <h5>Descriptif du projet :</h5>
                  </Form.Label>
                  <Form.Control
                    rows={8}
                    as="textarea"
                    placeholder="Indiquer le descriptif du projet"
                    value={article.richText}
                    onChange={(e) => {
                      handleContentChange(e);
                    }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>

              <Col>
                <Row>
                  <Col>
                    <h5>Images de l'article</h5>
                  </Col>
                </Row>

                <Row>
                  <Col
                    className="g-2 pt-2 d-flex flex-row flex-wrap overflow-auto"
                    key={key}
                  >
                    <Row xs={2} md={4} style={{ width: "100%" }}>
                      {[...article.images]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((image, index) => (
                          <Col className="m-2">
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
                                  variant="danger"
                                  onClick={() =>
                                    handleRemoveImage(image.idImage)
                                  }
                                  style={{
                                    fontSize: "12px",
                                  }}
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
    </>
  );
}

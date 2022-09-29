import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalAjouterImage from "../../Components/ModalAjouterImage";
import { Card } from "react-bootstrap";
import ArticleService from "../../services/article.service";

export default function AjouterArticle() {
  const [article, setArticle] = useState();
  const [isLoading, setLoading] = useState(false);

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

  const handleSectionChange = (e) => {
    setArticle((article) => ({
      ...article,
      section: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ArticleService.creerArticle(article).then((res) => {
      console.log("projet créé : ", res);
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
                    <h5>Titre de l'article :</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indiquer le titre de l'article"
                    required
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-3">
                  <Form.Label>
                    <h5>Section de l'article :</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indiquer la section de l'article"
                    required
                    onChange={(e) => {
                      handleSectionChange(e);
                    }}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>
                    <h5>Descriptif de l'article :</h5>
                  </Form.Label>
                  <Form.Control
                    rows={8}
                    as="textarea"
                    placeholder="Indiquer le descriptif de l'article"
                    onChange={(e) => {
                      handleContentChange(e);
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
}

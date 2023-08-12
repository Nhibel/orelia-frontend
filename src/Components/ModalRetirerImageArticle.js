import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ArticleService from "../services/article.service";

export default function ModalRetirerImageArticle({
  closeModal,
  show,
  idArticle,
  reloadImagesFunc,
  articleImages,
}) {
  const [imagesSelected, setImagesSelected] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ArticleService.removeImageArticle(idArticle, imagesSelected);
    reloadImagesFunc();
    closeModal(false);
  };

  const handleImageSelect = (e) => {
    if (e.target.checked) {
      const newArr = imagesSelected;
      newArr.push(e.target.id);
      setImagesSelected(newArr);
    } else {
      setImagesSelected(imagesSelected.filter((id) => id !== e.target.id));
    }
  };

  return (
    <Modal
      size="xl"
      show={show}
      style={{ zIndex: 9999 }}
      onHide={() => closeModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Retirer des images au projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex flex-row flex-wrap justify-content-around">
            {articleImages.map((image) => (
              <div key={image.idImage} className="p-2">
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleImageSelect(e)}
                  id={image.idImage}
                  style={{
                    position: "absolute",
                    marginLeft: "2px",
                  }}
                />
                <img style={{ height: "200px" }} src={image.thumbUrl} alt="" />
              </div>
            ))}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </Button>
        <Button variant="secondary" onClick={() => closeModal(false)}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

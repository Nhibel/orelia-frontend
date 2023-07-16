import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ArticleService from "../services/article.service";
import ImageService from "../services/image.service";

export default function ModalAjouterImageArticle({
  idArticle,
  closeModal,
  show,
  reloadImagesFunc,
}) {
  const [isLoading, setLoading] = useState(true);
  const [gallery, setGallery] = useState();
  const [imagesSelected, setImagesSelected] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const pictures = await ImageService.getImages();
      setGallery(pictures.data.data);
      setLoading(false);
    };
    fetchPictures();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ArticleService.ajouterImagesArticle(idArticle, imagesSelected).then(
      closeModal(false)
    );
    reloadImagesFunc();
  };

  const handleImageSelect = (e) => {
    if (e.target.checked) {
      let newArr = imagesSelected;
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
        <Modal.Title>Ajouter des images à l'article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex flex-row flex-wrap justify-content-around">
            {gallery.map((image, index) => {
              if (!image.idArticles.includes(idArticle)) {
                return (
                  <div key={index} className="p-2">
                    <Form.Check
                      type="checkbox"
                      onChange={(e) => handleImageSelect(e)}
                      id={image.idImage}
                      style={{
                        position: "absolute",
                        marginLeft: "2px",
                      }}
                    ></Form.Check>
                    <img
                      style={{ height: "200px" }}
                      src={image.thumbUrl}
                      alt=""
                    />
                  </div>
                );
              }
            })}
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

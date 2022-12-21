import { useState, useEffect } from "react";
import UploadFiles from "../../Components/upload-files.component";
import { Modal, Button } from "react-bootstrap";
import AuthService from "../../services/auth.service";
import ImageService from "../../services/image.service";

export default function ImagesAdmin() {
  const [showPage, setShowPage] = useState(false);
  const [images, setImages] = useState();

  // Afficher Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const childToParent = (reload) => {
    if (reload === "OK") {
      getImages();
      handleClose();
    }
  };

  const getImages = async () => {
    await ImageService.getImages().then((res) => {
      setImages(res.data.data);
    });
  };

  const deleteImage = (filename) => {
    ImageService.deleteImageByFilename(filename).then((response) => {
      response = "OK" ? getImages() : alert("error");
    });
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user != null) {
      setShowPage(true);
    }
    getImages();
  }, []);

  return (
    <div className="contenu">
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Ajouter Images
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadFiles childToParent={childToParent} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex flex-wrap justify-content-around">
        {images &&
          images.map((image, index) => (
            <div className="card m-2" style={{ width: "15rem" }} key={index}>
              <img
                className="card-img-top"
                src={image.thumbUrl}
                alt={image.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="card-title">{image.name}</p>
                <Button
                  variant="warning"
                  onClick={() => deleteImage(image.name)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

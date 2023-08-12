import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import UploadFiles from "../../Components/upload-files.component";
import ImageService from "../../services/image.service";

export default function ImagesAdmin() {
  const [images, setImages] = useState();

  // Afficher Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getImages = async () => {
    await ImageService.getImages().then((res) => {
      setImages(res.data.data);
    });
  };

  const childToParent = (reload) => {
    if (reload === "OK") {
      getImages();
      handleClose();
    }
  };

  const deleteImage = (filename) => {
    ImageService.deleteImageByFilename(filename)
      .then((response) => {
        if (response === "OK") {
          getImages();
        } else {
          toast.error("Erreur lors de la suppression de l'image");
        }
      })
      .catch((error) => {
        toast.error(`Erreur lors de la suppression de l'image : ${error}`);
      });
  };

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
          images.map((image) => (
            <div
              className="card m-2"
              style={{ width: "15rem" }}
              key={images.idImage}
            >
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

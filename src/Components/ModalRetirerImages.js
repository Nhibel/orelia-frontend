import { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";
import Form from "react-bootstrap/Form";
//import authHeader from "../services/auth-header";
import api from "../services/api";

export default function ModalRetirerImage({
  closeModal,
  show,
  idProjet,
  reloadImagesFunc,
  projetImages,
}) {
  const [imagesSelected, setImagesSelected] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(
      `http://localhost:8080/projets/${idProjet}/remove/images`,
      imagesSelected
    );
    reloadImagesFunc();
    closeModal(false);
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
        <Modal.Title>Retirer des images au projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex flex-row flex-wrap justify-content-around">
            {projetImages.map((image, index) => {
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

import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";

export default function Contact() {
  const initialFormData = Object.freeze({
    name: "",
    email: "",
    mobile: "",
    query: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);

      const templateId = "template_zpurtko";
      const serviceID = "service_vgh86ar";
      const publicKey = "q_HbaQt5ox-p7RLzN";
      sendFeedback(
        serviceID,
        templateId,
        {
          from_name: formData.name,
          mobile: formData.mobile,
          message_html: formData.query,
          email: formData.email,
        },
        publicKey
      );
    }
    setValidated(true);
  };

  const sendFeedback = (serviceID, templateId, variables, publicKey) => {
    emailjs
      .send(serviceID, templateId, variables, publicKey)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Votre message a bien été envoyé",
        });
      })
      .catch((err) => console.error("Houston, on a un problème : ", err));
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          layout
          initial={{ transform: "scale(0)" }}
          animate={{ transform: "scale(1)" }}
          exit={{ transform: "scale(0)" }}
          className="contenu justify-content-center d-flex"
        >
          <div style={{ width: "50%" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Col} controlId="formGridName" className="mb-2">
                <Form.Label>
                  Nom<span className="required"> *</span>
                </Form.Label>
                <Form.Control
                  required
                  name="name"
                  type="text"
                  placeholder="Votre nom..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez renseigner votre nom
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail" className="mb-2">
                <Form.Label>
                  Email<span className="required"> *</span>
                </Form.Label>
                <Form.Control
                  required
                  name="email"
                  type="email"
                  placeholder="Votre email..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez renseigner votre email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMobile" className="mb-2">
                <Form.Label>
                  Téléphone<span className="required"> *</span>
                </Form.Label>
                <Form.Control
                  required
                  name="mobile"
                  placeholder="Votre téléphone..."
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez renseigner votre téléphone
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} id="formGridQuery" className="mb-2">
                <Form.Label>
                  Message<span className="required"> *</span>
                </Form.Label>
                <Form.Control
                  required
                  name="query"
                  as="textarea"
                  rows={3}
                  onChange={handleChange}
                  placeholder="Votre message..."
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez renseigner votre message
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-3 text-center">
                <Button type="submit" className="rounded-pill">
                  Envoyer
                </Button>
              </div>
            </Form>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

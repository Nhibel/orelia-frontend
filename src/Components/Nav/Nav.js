import "./Nav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./images/logo-nekoayume-purple.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function NavMenu() {
  // Définissez un état pour suivre le bouton actuellement sélectionné
  const [selectedButton, setSelectedButton] = useState("home");

  // Créez une fonction de gestionnaire d'événements pour mettre à jour l'état lorsqu'un bouton est cliqué
  const handleButtonClick = (event) => {
    setSelectedButton(event.target.textContent.toLowerCase());
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="mb-0 fixed-top justify-content-center w-100"
        style={{
          zIndex: 20,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(183, 82, 176, 0.8)",
          margin: "0 auto",
          borderRadius: "0 0 50px 50px",
          maxWidth: "750px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "center",
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        }}
      >
        <AnimatePresence>
          <motion.div
            layout
            initial={{ marginTop: "-200px" }}
            animate={{ marginTop: "0px" }}
            exit={{ marginTop: "-200px" }}
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="principal-navlink menu-top text-center"
                style={{ fontSize: "30px", fontFamily: "Pacifico" }}
              >
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`mx-4 mt-1 ${
                    selectedButton === "home" ? "current" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Projets"
                  className={`mx-4 mt-1 ${
                    selectedButton === "projets" ? "current" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Projets
                </Nav.Link>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Navbar.Brand as={Link} to="/" className="m-0 p-0 mx-4">
                    <img src={logo} alt="" style={{ height: "75px" }} />
                  </Navbar.Brand>
                </motion.div>
                <Nav.Link
                  as={Link}
                  to="/about"
                  className={`mx-4 mt-1 ${
                    selectedButton === "about" ? "current" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contact"
                  className={`mx-4 mt-1 ${
                    selectedButton === "contact" ? "current" : ""
                  }`}
                  onClick={handleButtonClick}
                >
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </motion.div>
        </AnimatePresence>
      </Navbar>
    </>
  );
}

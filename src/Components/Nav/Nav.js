import "./Nav.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./images/logo.svg";
import instagram from "./images/instagram.png";
import phone from "./images/phone.png";
import linkedin from "./images/linkedin.png";
import mail from "./images/mail.png";

export default function NavMenu() {
  // Définissez un état pour suivre le bouton actuellement sélectionné
  const [selectedButton, setSelectedButton] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1]; // '/' renvoie ['',''], '/about' renvoie ['', 'about']
    setSelectedButton(currentPath === "" ? "projets" : currentPath);
  }, [location]);

  // Créez une fonction de gestionnaire d'événements pour mettre à jour l'état lorsqu'un bouton est cliqué
  const handleButtonClick = (event) => {
    setSelectedButton(event.target.textContent.toLowerCase());
  };

  return (
    <>
      <Navbar
        className="mb-0 fixed-top w-100"
        style={{
          zIndex: 20,
          backdropFilter: "blur(6px)",
          background:
            "linear-gradient(90deg, rgba(45,0,44,1) 0%, rgba(153,8,79,1) 60%, rgba(153,28,8,1) 100%)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "rgba(0, 0, 0, 0.8) 0px 10px 40px",
          height: "160px",
        }}
      >
        <Navbar.Brand as={Link} to="/" className="m-0 p-0 mx-5">
          <img
            className="logo"
            src={logo}
            alt=""
            style={{
              height: "10vw",
              minHeight: "90px",
              maxWidth: "150px",
              maxHeight: "140px",
            }}
          />
        </Navbar.Brand>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="principal-navlink menu-top text-end"
            style={{
              fontSize: "30px",
              fontFamily: "Raleway",
              textTransform: "uppercase",
              fill: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Nav.Link
              as={Link}
              to="/"
              className={`mx-4 mt-0 p-0 ${
                selectedButton === "projets" ? "current" : ""
              }`}
              onClick={handleButtonClick}
            >
              Projets
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              className={`mx-4 mt-0 p-0 ${
                selectedButton === "about" ? "current" : ""
              }`}
              onClick={handleButtonClick}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={`mx-4 mt-0 p-0 ${
                selectedButton === "contact" ? "current" : ""
              }`}
              onClick={handleButtonClick}
            >
              Contact
            </Nav.Link>
          </div>

          <Nav
            className="social-links text-end"
            style={{ marginRight: "20px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Nav.Link
                href="https://www.instagram.com/nekoayume/"
                target="_blank"
                className="px-2 icon-link"
              >
                <img src={instagram} alt="instagram" className="contact-icon" />
              </Nav.Link>

              <Nav.Link
                href="https://fr.linkedin.com/in/aur%C3%A9lia-bezfamille-03208321"
                target="_blank"
                className="px-2 icon-link"
              >
                <img src={linkedin} alt="linkedin" className="contact-icon" />
              </Nav.Link>

              <Nav.Link as={Link} to="/contact" className="px-2 icon-link">
                <img src={mail} alt="mail" className="contact-icon" />
              </Nav.Link>

              <Nav.Link href="tel:0631684770" className="px-2 icon-link">
                <img src={phone} alt="phone" className="contact-icon" />
              </Nav.Link>
            </div>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}

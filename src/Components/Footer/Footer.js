import React, { useState, useEffect } from "react";
import instagram from "./images/instagram.png";
import phone from "./images/phone.png";
import linkedin from "./images/linkedin.png";
import mail from "./images/mail.png";
import AuthService from "../../services/auth.service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdmin, setShowAdmin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdmin(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        className="justify-content-center contact-navlink footer fixed-bottom"
        expand="lg"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav>
            <Nav.Link
              href="https://www.instagram.com/nekoayume/"
              target="_blank"
              className="px-2 py-1"
            >
              <img src={instagram} alt="instagram" className="contact-icon" />
            </Nav.Link>

            <Nav.Link
              href="https://fr.linkedin.com/in/aur%C3%A9lia-bezfamille-03208321"
              target="_blank"
              className="px-2 py-1"
            >
              <img src={linkedin} alt="linkedin" className="contact-icon" />
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="px-2 py-1">
              <img src={mail} alt="mail" className="contact-icon" />
            </Nav.Link>

            <Nav.Link href="tel:0631684770" className="px-2 py-1">
              <img src={phone} alt="phone" className="contact-icon" />
            </Nav.Link>

            <Nav.Link
              href="tel:0631684770"
              className="pt-1 pb-1 pl-0 pr-2 call-me"
            >
              Me contacter : 06 31 68 47 70
            </Nav.Link>

            {showAdmin && (
              <Nav.Link as={Link} to="/admin" className="px-2 py-1">
                ADMIN
              </Nav.Link>
            )}

            {showAdmin && (
              <Nav.Link
                className="px-2 py-1"
                onClick={() => {
                  logOut();
                }}
              >
                LOGOUT
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

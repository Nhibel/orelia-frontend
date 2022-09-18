import React, { useState, useEffect } from "react";
import "./Nav.css";
// NavLink sert à ajouter une classe à l'élément en cours
// Pas obligatoire, on peut très bien utiliser Nav
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./images/logo-nekoayume.svg";
import instagram from "./images/instagram.png";
import phone from "./images/phone.png";
import linkedin from "./images/linkedin.png";
import mail from "./images/mail.png";

export default function NavMenu() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdmin, setShowAdmin] = useState(false);

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
  };

  return (
    <>
      <Navbar
        className="justify-content-end contact-navlink"
        style={{
          zIndex: 2,
          backgroundColor: "#f6cf96",
        }}
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

          <Nav.Link href="/" className="px-2 py-1">
            <img src={mail} alt="mail" className="contact-icon" />
          </Nav.Link>

          <Nav.Link href="tel:0631684770" className="px-2 py-1">
            <img src={phone} alt="phone" className="contact-icon" />
          </Nav.Link>

          <Nav.Link
            href="tel:0631684770"
            className="pt-1 pb-1 pl-0 pr-2 call-me"
          >
            Appelez-moi : 06 31 68 47 70
          </Nav.Link>

          {currentUser && (
            <Nav.Link href="/admin" className="px-2 py-1">
              ADMIN
            </Nav.Link>
          )}

          <Nav.Link
            className="px-2 py-1"
            onClick={() => {
              logOut();
            }}
          >
            LOGOUT
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar
        className="mb-0 shadow-lg"
        style={{
          zIndex: 2,
          backdropFilter: "blur(2px)",
          paddingLeft: "15px",
        }}
      >
        <Navbar.Brand href="/" className="m-0 p-0">
          <img src={logo} alt="" style={{ height: "75px" }} />
        </Navbar.Brand>
        <Nav className="me-auto principal-navlink" style={{ fontSize: "25px" }}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Projets">Projets</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

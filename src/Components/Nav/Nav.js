import "./Nav.css";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./images/logo-nekoayume.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function NavMenu() {
  return (
    <>
      <Navbar
        expand="lg"
        className="mb-0 shadow-lg fixed-top justify-content-center"
        style={{
          zIndex: 20,
          backdropFilter: "blur(2px)",
          textAlign: "center",
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
                className="principal-navlink menu-top"
                style={{ fontSize: "30px", fontFamily: "Pacifico" }}
              >
                <Nav.Link as={Link} to="/" className="mx-4 mt-1">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/Projets" className="mx-4 mt-1">
                  Projets
                </Nav.Link>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Navbar.Brand as={Link} to="/" className="m-0 p-0 mx-4">
                    <img src={logo} alt="" style={{ height: "75px" }} />
                  </Navbar.Brand>
                </motion.div>
                <Nav.Link as={Link} to="/about" className="mx-4 mt-1">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="mx-4 mt-1">
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

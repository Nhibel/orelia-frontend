import React, { useState, useEffect } from "react";
import "./Nav.css";
// NavLink sert à ajouter une classe à l'élément en cours
// Pas obligatoire, on peut très bien utiliser Nav
import { NavLink } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { Button } from "react-bootstrap";

export default function Nav() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("user : ", user);
    console.log("showAdmin : ", showAdmin);
    if (user) {
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
      console.log(showAdmin);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdmin(false);
  };

  return (
    <nav className="nav justify-content-center">
      <NavLink to="/">
        <a className="nav-link">Accueil</a>
      </NavLink>
      <NavLink to="/Projets">
        <a className="nav-link">Projets</a>
      </NavLink>
      <NavLink to="/login">
        <a className="nav-link">login</a>
      </NavLink>
      <NavLink to="/register">
        <a className="nav-link">sign up</a>
      </NavLink>
      {showAdmin && (
        <NavLink to="/admin">
          <a className="nav-link">admin</a>
        </NavLink>
      )}
      <NavLink to="/login">
        <a className="nav-link" onClick={logOut}>
          LogOut
        </a>
      </NavLink>
    </nav>
  );
}

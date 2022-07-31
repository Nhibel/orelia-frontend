import React from "react";
import "./Nav.css";
// NavLink sert à ajouter une classe à l'élément en cours
// Pas obligatoire, on peut très bien utiliser Nav
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav justify-content-center">
      <NavLink to="/">
        <a className="nav-link active">Accueil</a>
      </NavLink>
      <NavLink to="/Projets">
        <a className="nav-link active">Projets</a>
      </NavLink>
    </nav>
  );
}

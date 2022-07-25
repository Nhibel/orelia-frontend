import React from "react";
import "./Nav.css";
// NavLink sert à ajouter une classe à l'élément en cours
// Pas obligatoire, on peut très bien utiliser Nav
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav class="nav justify-content-center">
      <NavLink to="/">
        <a class="nav-link active">Accueil</a>
      </NavLink>
      <NavLink to="/Projets">
        <a class="nav-link active">Projets</a>
      </NavLink>
    </nav>
  );
}

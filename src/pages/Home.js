import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <p className="h1">Bienvenue sur l'accueil</p>
      <NavLink
        to={{
          pathname: "/Projets",
        }}
      >
        Aller à la section Projets
      </NavLink>
    </>
  );
}

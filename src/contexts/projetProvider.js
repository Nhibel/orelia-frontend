import React, { useState, useEffect } from "react";
import ProjetService from "../services/projet.service";
import ProjetContext from "./projetContext";
const ProjetProvider = ({ children }) => {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetchProjets = async () => {
      const response = await ProjetService.getProjets();
      setProjets(response.data.data);
    };
    fetchProjets();
  }, []);

  return (
    <ProjetContext.Provider value={{ projets, setProjets }}>
      {children}
    </ProjetContext.Provider>
  );
};

export default ProjetProvider;

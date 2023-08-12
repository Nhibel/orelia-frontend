import React, { useState, useEffect, useMemo } from "react";
import ProjetService from "../services/projet.service";
import ProjetContext from "./projetContext";

function ProjetProvider({ children }) {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetchProjets = async () => {
      const response = await ProjetService.getProjets();
      setProjets(response.data.data);
    };
    fetchProjets();
  }, []);

  const contextValue = useMemo(
    () => ({ projets, setProjets }),
    [projets, setProjets]
  );

  return (
    <ProjetContext.Provider value={contextValue}>
      {children}
    </ProjetContext.Provider>
  );
}

export default ProjetProvider;

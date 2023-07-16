import { useEffect, useState } from "react";
import axios from "axios";

export const useProjet = (idProjet) => {
  const [testtets, setTesttets] = useState();

  useEffect(() => {
    axios.get(`/projets/${idProjet}`).then((result) => {
      setTesttets(result.data.data);
    });
  }, []);

  return { testtets };
};

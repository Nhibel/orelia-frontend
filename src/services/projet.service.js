import api from "./api";

const getProjetById = (idProjet) => {
  return api.get(`/projets/${idProjet}`);
};

const getProjets = () => {
  return api.get("/projets/all");
};

const gererImageEnValeur = (idProjet, idImage, projet) => {
  return api.put(`/projets/${idProjet}/image-en-valeur/${idImage}`, projet);
};

const updateProjet = (projet) => {
  return api.put("/projets/", projet);
};

const removeImageProjet = (idProjet, arrIdImage) => {
  return api.put(`/projets/${idProjet}/remove/images`, arrIdImage);
};

const ProjetService = {
  getProjetById,
  getProjets,
  gererImageEnValeur,
  updateProjet,
  removeImageProjet,
};

export default ProjetService;

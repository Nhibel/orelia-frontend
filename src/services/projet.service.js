import api from "./api";

const getProjetById = (idProjet) => {
  return api.get(`/projets/${idProjet}`);
};

const ajouterProjet = (projet) => {
  return api.post("/projets/", projet);
};

const supprimerProjet = (idProjet) => {
  return api.delete(`/projets/${idProjet}`);
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

const ajouterImagesToProjet = (idProjet, imagesSelected) => {
  return api.put(`/projets/${idProjet}/images`, imagesSelected);
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
  ajouterProjet,
  supprimerProjet,
  ajouterImagesToProjet,
};

export default ProjetService;

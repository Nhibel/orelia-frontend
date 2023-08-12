import api from "./api";

const getProjetById = (idProjet) => api.get(`/projets/${idProjet}`);

const ajouterProjet = (projet) => api.post("/projets/", projet);

const supprimerProjet = (idProjet) => api.delete(`/projets/${idProjet}`);

const getProjets = () => api.get("/projets/all");

const gererImageEnValeur = (idProjet, idImage, projet) =>
  api.put(`/projets/${idProjet}/image-en-valeur/${idImage}`, projet);

const updateProjet = (projet) => api.put("/projets/", projet);

const ajouterImagesToProjet = (idProjet, imagesSelected) =>
  api.put(`/projets/${idProjet}/images`, imagesSelected);

const removeImageProjet = (idProjet, arrIdImage) =>
  api.put(`/projets/${idProjet}/remove/images`, arrIdImage);

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

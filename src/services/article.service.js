import api from "./api";

const getArticlesBySectionName = (sectionName) => {
  return api.get(`/articles/section/${sectionName}`);
};

const getArticles = () => {
  return api.get(`/articles/`);
};

const ajouterImagesArticle = (idArticle, selectionImages) => {
  return api.put(`/articles/${idArticle}/images`, selectionImages);
};

const creerArticle = (article) => {
  return api.post(`/articles/`, article);
};

const updateArticle = (article) => {
  return api.put(`/articles/`, article);
};

const removeImageArticle = (idArticle, arrIdImage) => {
  return api.put(`/articles/${idArticle}/remove/images`, arrIdImage);
};

const ArticleService = {
  getArticlesBySectionName,
  getArticles,
  ajouterImagesArticle,
  updateArticle,
  removeImageArticle,
  creerArticle,
};

export default ArticleService;

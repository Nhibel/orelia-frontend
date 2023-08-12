import api from "./api";

const getArticlesBySectionName = (sectionName) =>
  api.get(`/articles/section/${sectionName}`);

const getArticles = () => api.get(`/articles/`);

const ajouterImagesArticle = (idArticle, selectionImages) =>
  api.put(`/articles/${idArticle}/images`, selectionImages);

const creerArticle = (article) => api.post(`/articles/`, article);

const updateArticle = (article) => api.put(`/articles/`, article);

const removeImageArticle = (idArticle, arrIdImage) =>
  api.put(`/articles/${idArticle}/remove/images`, arrIdImage);

const ArticleService = {
  getArticlesBySectionName,
  getArticles,
  ajouterImagesArticle,
  updateArticle,
  removeImageArticle,
  creerArticle,
};

export default ArticleService;

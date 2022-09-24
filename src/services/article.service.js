import api from "./api";

const getArticlesBySectionName = (sectionName) => {
  return api.get(`/articles/section/${sectionName}`);
};

const ArticleService = {
  getArticlesBySectionName,
};

export default ArticleService;

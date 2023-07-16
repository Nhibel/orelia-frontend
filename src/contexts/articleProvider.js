// articleProvider.js
import React, { useState, useEffect } from "react";
import ArticleService from "../services/article.service";
import ArticleContext from "./articleContext";

const ArticleProvider = ({ children }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await ArticleService.getArticlesBySectionName("home");
      setArticle(response.data.data);
    };

    fetchArticle();
  }, []);

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
export default ArticleProvider;

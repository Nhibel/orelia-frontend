// articleProvider.js
import React, { useState, useEffect, useMemo } from "react";
import ArticleService from "../services/article.service";
import ArticleContext from "./articleContext";

function ArticleProvider({ children }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await ArticleService.getArticlesBySectionName("home");
      setArticle(response.data.data);
    };

    fetchArticle();
  }, []);

  const contextValue = useMemo(
    () => ({ article, setArticle }),
    [article, setArticle]
  );

  return (
    <ArticleContext.Provider value={contextValue}>
      {children}
    </ArticleContext.Provider>
  );
}
export default ArticleProvider;

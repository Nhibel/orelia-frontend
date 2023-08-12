/* eslint-disable react/no-danger */
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import ArticleService from "../services/article.service";

export default function About() {
  const [article, setArticle] = useState();
  const [isLoading, setLoading] = useState(true);

  const getArticles = () =>
    ArticleService.getArticlesBySectionName("About").then((result) => {
      const sanitizedContent = DOMPurify.sanitize(result.data.data.richText);
      setArticle({ ...result.data.data, richText: sanitizedContent });
      setLoading(false);
    });

  useEffect(() => {
    getArticles();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="contenu w-50">
        {/* slint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: article.richText }} />
      </div>
    </div>
  );
}

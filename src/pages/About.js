import { useEffect, useState } from "react";
import ArticleService from "../services/article.service";

export default function About() {
  const [article, setArticle] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () =>
    ArticleService.getArticlesBySectionName("About").then((result) => {
      setArticle(result.data.data);
      setLoading(false);
    });

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="contenu">
      <div dangerouslySetInnerHTML={{ __html: article.richText }} />
    </div>
  );
}

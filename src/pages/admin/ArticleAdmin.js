import { useParams } from "react-router-dom";
import ModifierArticle from "../../Components/ModifierArticle";
import ModifierArticleAbout from "../../Components/ModifierArticleAbout";

export default function ArticleAdmin() {
  const { slug } = useParams();

  return (
    <div className="contenu">
      {slug !== "About" ? (
        <ModifierArticle slug={slug} />
      ) : (
        <ModifierArticleAbout slug={slug} />
      )}
    </div>
  );
}

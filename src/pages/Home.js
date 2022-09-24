import axios from "axios";
import { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { Fade } from "react-slideshow-image";
import ArticleService from "../services/article.service";
import "react-slideshow-image/dist/styles.css";

export default function Home() {
  const [article, setArticle] = useState();
  const [isLoading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const getArticles = () =>
      ArticleService.getArticlesBySectionName("home").then((result) => {
        setArticle(result.data.data);
        setLoading(false);
      });

    if (!article) {
      getArticles();
    } else if (article) {
      const getGallery = article.images.map((image) => {
        return image.url;
      });

      setGallery(getGallery);
      setLoading(false);
    }
  }, [article]);

  if (isLoading) {
    return <div></div>;
  }

  const fadeProperties = {
    duration: 5000,
    transitionDuration: 2000,
    infinite: true,
    indicators: false,
    scale: 0,
    arrows: false,
    pauseOnHover: false,
    canSwipe: false,
  };

  return (
    <>
      <div
        style={{
          marginTop: "-121px",
          overflow: "hidden",
          marginLeft: "-0.75rem",
          marginRight: "-0.75rem",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Fade {...fadeProperties}>
          {gallery.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                style={{
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                  objectPosition: "50% 10%",
                }}
              />
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
}

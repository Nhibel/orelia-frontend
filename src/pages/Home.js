import { useEffect, useState, useContext } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { Fade } from "react-slideshow-image";
import ArticleService from "../services/article.service";
import "react-slideshow-image/dist/styles.css";
import ArticleContext from "../contexts/articleContext";

export default function Home() {
  const { article, setArticle } = useContext(ArticleContext);
  const [isLoading, setLoading] = useState(true);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (article) {
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
          //marginTop: "-121px",
          overflow: "hidden",
          marginLeft: "-0.75rem",
          marginRight: "-0.75rem",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "fixed",
            bottom: "48px",
            width: "100%",
            zIndex: 20,
          }}
        >
          <div
            className="p-3"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0),  rgba(255, 255, 255, 0.7)",
              color: "black",
              textAlign: "center",
            }}
          >
            <h2>{article.title}</h2>
            <h4 style={{ margin: "0" }}>{article.richText}</h4>
          </div>
        </div>

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

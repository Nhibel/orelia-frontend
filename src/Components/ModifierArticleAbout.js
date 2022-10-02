import { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import ArticleService from "../services/article.service";
import ImageService from "../services/image.service";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

export default function ModifierArticleAbout({ slug }) {
  const [article, setArticle] = useState();
  const [articleToSave, setArticleToSave] = useState();
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [gallery, setGallery] = useState([]);
  const [tinyGallery, setTinyGallery] = useState([]);

  useEffect(() => {
    ArticleService.getArticlesBySectionName(slug).then((res) => {
      setArticle(res.data.data);
      setArticleToSave(res.data.data);
      setTitle(res.data.data.title);
    });

    ImageService.getImages().then((res) => {
      setGallery(res.data.data);
    });
  }, []);

  useEffect(() => {
    let newArr = [];
    if (gallery) {
      gallery.map((image) => {
        newArr.push({ title: image.name, value: image.thumbUrl });
      });
    }
    setTinyGallery(newArr);
    setLoading(false);
  }, [gallery]);

  useEffect(() => {
    if (articleToSave != article) {
      ArticleService.updateArticle(articleToSave).then(
        toast.success("Article mis à jour avec succès !")
      );
    }
  }, [articleToSave]);

  const saveText = (richText) => {
    setArticleToSave((article) => ({
      ...article,
      richText: richText,
    }));
  };

  const editorRef = useRef(null);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!isLoading && tinyGallery.length && (
        <div className="d-flex justify-content-center">
          <div style={{ width: "75%" }}>
            <Editor
              apiKey="9pnpqm0jtajw64w1slmwlb8dtx6lytstsn55qcxwzy191hkr"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={article.richText}
              init={{
                image_list: tinyGallery,
                images_upload_url: "postAcceptor.php",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "image code | link image |" +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            <div className="mt-2 text-center">
              <Button onClick={() => saveText(editorRef.current.getContent())}>
                Valider
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

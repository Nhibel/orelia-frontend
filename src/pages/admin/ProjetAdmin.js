import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ProjetModel } from "../../models/ProjetModel";
import { Editor } from "@tinymce/tinymce-react";
import authHeader from "../../services/auth-header";
import { useParams } from "react-router-dom";

export default function ProjetAdmin() {
  const { slug } = useParams();
  const monProjet = new ProjetModel();
  const editorRef = useRef(null);

  const [projet, setProjet] = useState(monProjet);

  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) {
      return;
    }
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    axios.get(`/projets/${slug}`).then((res) => {
      setProjet(res.data.data);
    });
  }, [images]);

  // Callback~
  const onImageChange = (e) => {
    setImages([...e.target.files]);
    console.log(e.target.files);
  };

  const saveText = (richText) => {
    const projetModif = projet;
    projetModif.richText = richText;
    axios
      .put(`http://localhost:8080/projets/`, projetModif, {
        headers: authHeader(),
      })
      .then((res) => {
        setProjet(res.data.data);
        console.log(res);
        console.log("res.data : ", res.data);
      });
  };

  return (
    <>
      <input type="file" multiple accept="image/*" onChange={onImageChange} />
      {imageURLs.map((imageSrc) => (
        <img src={imageSrc} />
      ))}

      <Editor
        apiKey="9pnpqm0jtajw64w1slmwlb8dtx6lytstsn55qcxwzy191hkr"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={
          projet.richText
            ? projet.richText
            : "<p>This is the initial content of the editor.</p>"
        }
        init={{
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
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={() => saveText(editorRef.current.getContent())}>
        Log editor content
      </button>
    </>
  );
}

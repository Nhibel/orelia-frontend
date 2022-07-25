import { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function projetAdmin() {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const saveText = (richText) => {
    const projetTest = new ProjetModel();
    projetTest.title = "test2";
    projetTest.richText = richText;
    axios.post(`http://localhost:8080/projets/`, projetTest).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <>
      <Editor
        apiKey="9pnpqm0jtajw64w1slmwlb8dtx6lytstsn55qcxwzy191hkr"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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

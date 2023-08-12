import api from "./api";

const getImages = () => api.get("/images/get-all");

const deleteImageByFilename = (filename) => api.delete(`/images/${filename}`);

const addImage = (formData, onUploadProgress) =>
  api.post("/images/upload", formData, {
    onUploadProgress,
  });

const ImageService = {
  getImages,
  deleteImageByFilename,
  addImage,
};

export default ImageService;

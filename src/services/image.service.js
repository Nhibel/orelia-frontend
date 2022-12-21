import api from "./api";

const getImages = () => {
  return api.get("/images/get-all");
};

const deleteImageByFilename = (filename) => {
  return api.delete(`/images/${filename}`);
};

const addImage = (formData, onUploadProgress) => {
  return api.post("/images/upload", formData, {
    onUploadProgress,
  });
};

const ImageService = {
  getImages,
  deleteImageByFilename,
  addImage,
};

export default ImageService;

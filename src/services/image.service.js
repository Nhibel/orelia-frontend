import api from "./api";

const getImages = () => {
  return api.get("/images/get-all");
};

const deleteImageByFilename = (filename) => {
  return api.delete(`/images/${filename}`);
};

const ImageService = {
  getImages,
  deleteImageByFilename,
};

export default ImageService;

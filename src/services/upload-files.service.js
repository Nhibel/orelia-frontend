import ImageService from "./image.service";

class UploadFilesService {
  static upload(file, onUploadProgress) {
    const formData = new FormData();
    formData.append("file", file);

    return ImageService.addImage(formData, onUploadProgress);
  }
}
export default new UploadFilesService();

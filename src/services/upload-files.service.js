import ImageService from "./image.service";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return ImageService.addImage(formData, onUploadProgress);
  }
}
export default new UploadFilesService();

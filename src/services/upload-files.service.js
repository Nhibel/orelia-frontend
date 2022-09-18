import http from "../http-commons";
import authHeader from "./auth-header";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    let headersWithBearer = authHeader();
    const newHeader = {
      Authorization: headersWithBearer.Authorization,
      "Content-Type": "multipart/form-data",
    };

    return http.post("/images/upload", formData, {
      headers: newHeader,
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/images/");
  }
}
export default new UploadFilesService();

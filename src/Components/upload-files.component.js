import React, { Component } from "react";
import UploadService from "../services/upload-files.service";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFiles = this.selectFiles.bind(this);
    this.upload = this.upload.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);

    this.state = {
      selectedFiles: undefined,
      progressInfos: [],
      message: [],
    };
  }

  selectFiles(event) {
    this.setState({
      progressInfos: [],
      selectedFiles: event.target.files,
    });
  }

  upload(idx, file) {
    const { progressInfos } = this.state;

    UploadService.upload(file, (event) => {
      progressInfos[idx].percentage = Math.round(
        (100 * event.loaded) / event.total
      );
      this.setState({
        progressInfos,
      });
    })
      .then(() => {
        this.setState((prev) => {
          const nextMessage = [
            ...prev.message,
            `Sauvegarde de l'image réussie : ${file.name}`,
          ];
          return {
            message: nextMessage,
          };
        });
      })
      .then(() => {
        const { childToParent } = this.props;
        childToParent("OK");
      })
      .catch(() => {
        progressInfos[idx].percentage = 0;
        this.setState((prev) => {
          const nextMessage = [
            ...prev.message,
            `Erreur lors de la sauvegarde de l'image : ${file.name}`,
          ];
          return {
            progressInfos,
            message: nextMessage,
          };
        });
      });
  }

  uploadFiles() {
    const { selectedFiles } = this.state;

    const progressInfos = selectedFiles.map((selectedFile) => ({
      percentage: 0,
      fileName: selectedFile.name,
    }));

    this.setState(
      {
        progressInfos,
        message: [],
      },
      () => {
        selectedFiles.forEach((file, i) => {
          this.upload(i, file);
        });
      }
    );
  }

  render() {
    const { selectedFiles, progressInfos, message } = this.state;

    return (
      <div>
        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${progressInfo.percentage}%` }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        <div className="row my-3">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type="file" multiple onChange={this.selectFiles} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!selectedFiles}
              onClick={this.uploadFiles}
              type="button"
            >
              Upload
            </button>
          </div>
        </div>

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

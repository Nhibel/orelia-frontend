import React from "react";

export class ImageModel extends React.Component {
  constructor(idImage, projetsId, name, location) {
    super();
    this.idImage = idImage;
    this.projetsId = projetsId;
    this.name = name;
    this.location = location;
  }
}

import React from "react";

export class ProjetModel extends React.Component {
  constructor(id, title, richText, images, type) {
    super();
    this.id = id;
    this.title = title;
    this.richText = richText;
    this.images = images;
    this.type = type;
  }
}

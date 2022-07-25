import React from "react";

export class ProjetModel extends React.Component {
  constructor(id, title, richText) {
    super();
    this.id = id;
    this.title = title;
    this.richText = richText;
  }
}

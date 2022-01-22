import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement, { extends: "li" });

export default class ListElement extends HTMLOListElement {
  constructor() {
    super();
  }

  connectedCallback() {
    for (var comment of this.comments) {
      const item = document.createElement("li", { is: "comments-item" });
      item.comment = comment;
      this.appendChild(item);
    }
  }
}

import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement, { extends: "li" });

export default class ListElement extends HTMLOListElement {
  constructor() {
    super();
  }

  set data(comments) {
    for (var comment of comments) {
      const item = document.createElement("li", { is: "comments-item" });
      item.data = comment;
      this.appendChild(item);
    }
  }
}

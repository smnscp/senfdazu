import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement);

export default class ListElement extends HTMLElement {
  constructor() {
    super();
  }

  set data(comments) {
    const ol = document.createElement("ol");
    for (var comment of comments) {
      const li = document.createElement("li");
      const ci = document.createElement("comments-item");
      ci.data = comment;
      li.appendChild(ci);
      ol.appendChild(li);
    }
    this.appendChild(ol);
  }
}

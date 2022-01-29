import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement);

export default class ListElement extends HTMLElement {
  set data(comments) {
    const ol = document.createElement("ol");
    for (var comment of comments) {
      const li = document.createElement("li");
      const ci = document.createElement("comments-item");
      ci.data = comment;
      li.appendChild(ci);
      ol.appendChild(li);
      if (comment.progeny.length) {
        const cl = document.createElement("comments-list");
        cl.data = comment.progeny;
        li.appendChild(cl);
      }
    }
    this.appendChild(ol);
  }
}

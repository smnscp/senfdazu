import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement);

export default class ListElement extends HTMLElement {
  static stylesheet = `<style>
    comments-list ol {
      counter-reset: comments-item;
    }
    comments-list li {
      counter-increment: comments-item;
    }
    comments-list li::marker {
      content: counters(comments-item, ".") ". ";
      color: var(--base04);
      font-weight: bold;
    }
  </style>`;

  set data(comments) {
    this.innerHTML = ListElement.stylesheet;
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

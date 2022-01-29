import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement);

export default class ListElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>
      :host {
        display: block;
      }
      ol {
        /* counter-reset: cntr; */
        margin: 0;
        padding: 0 0 0 2rem;
      }
      li {
        /* counter-increment: cntr; */
        margin: 0.5rem 0;
      }
      li::marker {
        /* content: counter(cntr) ". "; */
        /* content: attr(cntr); */
        color: var(--base04);
        font-weight: bold;
      }
    </style>`;
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
    this.shadowRoot.appendChild(ol);
  }
}

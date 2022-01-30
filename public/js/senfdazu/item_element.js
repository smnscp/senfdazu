import "../simple/date_element.js";
import "./reply_toggle_element.js";
import "./form_element.js";

export default class ItemElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        header, footer {
          margin: 0.5rem 0;
        }
        md-div {
          display: block;
          background: var(--base01);
          padding: 0 1rem;
          margin: 0.5rem 0;
          border-radius: 0.125rem;
          max-height: 23em;
          overflow: auto;
        }
      </style>

      <header>
        <strong id="name-field"></strong>
        <small><simple-date id="date-field"></simple-date></small>
      </header>
      <md-div id="message-field"></md-div>
      <footer>
        <sz-reply-toggle title="Reply to this message …">
          <sz-form></sz-form>
        </sz-reply-toggle>
      </footer>
    `;
  }

  set data(comment) {
    this.shadowRoot.querySelector("#name-field").innerText = comment.name;
    this.shadowRoot.querySelector("#date-field").innerText = comment.created_at;
    this.shadowRoot.querySelector("#message-field").innerText = comment.message;
  }

  attachReplies(comments) {
    if (!comments?.length) return;
    const ol = document.createElement("ol");
    ol.className = "sz-list";
    this.parentNode.appendChild(ol);
    for (var comment of comments) {
      const li = document.createElement("li");
      ol.appendChild(li);
      const ci = document.createElement("sz-item");
      li.appendChild(ci);
      ci.data = comment;
      ci.attachReplies(comment.progeny);
    }
  }
}

customElements.define("sz-item", ItemElement);
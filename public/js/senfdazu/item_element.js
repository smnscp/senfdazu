import "../simple/date_element.js";
import "./delete_button_element.js";
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
        sz-delete-button:not([action]) {
          display: none;
        }
      </style>

      <header>
        <strong id="name-field"></strong>
        <small><simple-date id="date-field"></simple-date></small>
        <sz-delete-button id="delete-button">Delete comment</sz-delete-button>
      </header>
      <md-div id="message-field"></md-div>
      <footer>
        <sz-reply-toggle title="Reply to this message …">
          <sz-form id="reply-form"></sz-form>
        </sz-reply-toggle>
      </footer>
    `;
  }

  get parent() {
    return this.closest(".sz-list").previousElementSibling;
  }

  get root() {
    return this.closest("sz-root + .sz-list").previousElementSibling;
  }

  get repliesList() {
    if (!this.nextElementSibling) {
      const ol = document.createElement("ol");
      ol.className = "sz-list";
      this.parentNode.appendChild(ol);
    }
    return this.nextElementSibling;
  }

  set data(comment) {
    this.select("#name-field").innerText = comment.name;
    this.select("#date-field").innerText = comment.created_at;
    this.select("#message-field").innerText = comment.message;
    const url = `${this.root.src}/${comment.lid}`;
    this.select("#reply-form").action = url;
    if (comment.token) {
      this.select("#delete-button").action = `${url}?token=${comment.token}`;
    }
  }

  select(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  attachReplies(comments) {
    if (!comments?.length) return;
    for (var comment of comments) {
      this.appendReply(comment);
    }
  }

  appendReply(comment) {
    if (!comment) return;
    const li = document.createElement("li");
    this.repliesList.appendChild(li);
    const ci = document.createElement("sz-item");
    li.appendChild(ci);
    ci.data = comment;
    ci.attachReplies(comment.progeny);
  }

  unlink() {
    this.parentElement.parentElement.removeChild(this.parentElement);
  }
}

customElements.define("sz-item", ItemElement);

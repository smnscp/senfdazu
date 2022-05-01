import "../simple/avatar_element.js";
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
          --text-color: black;
          --bg-color: grey;
          --figure-color: white;
          --box-smoothing: 0.125rem;
          --avatar-size: 2rem;

          display: block;
          position: relative;
          color: var(--text-color);
        }
        section.sz-list {
          padding-inline-start: calc(-0.5rem - var(--avatar-size));
        }
        header, footer {
          margin: 0.5rem 0;
        }
        header address {
          display: inline;
          font-weight: bold;
          font-style: normal;
        }
        header time {
          font-size: smaller;
        }
        simple-avatar {
          position: absolute;
          inset-block-start: 2rem;
          inset-inline-start: calc(-0.5rem - var(--avatar-size));
          width: var(--avatar-size);
        }
        simple-avatar svg {
          display: block;
          width: 100%;
          height: 100%;
        }
        md-div {
          display: block;
          padding: 0 1rem;
          margin: 0.5rem 0;
          max-height: 23em;
          overflow: auto;
        }
        simple-avatar, md-div {
          background: var(--bg-color);
          border-radius: var(--box-smoothing);
        }
        md-div pre {
          background: var(--figure-color);
          border-radius: var(--box-smoothing);
          padding: 0.5rem;
        }
        sz-delete-button:not([action]) {
          display: none;
        }
      </style>

      <header>
        <address id="name-field"></address>
        <simple-date id="date-field"></simple-date>
        <simple-avatar id="avatar-field"></simple-avatar>
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
      const replies = document.createElement("section");
      replies.className = "sz-list";
      this.parentNode.appendChild(replies);
    }
    return this.nextElementSibling;
  }

  set data(comment) {
    this.select("#name-field").innerText = comment.name;
    this.select("#date-field").innerText = comment.created_at;
    this.select("#avatar-field").innerText = comment.email_hash;
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
    const reply = document.createElement("article");
    this.repliesList.appendChild(reply);
    const item = document.createElement("sz-item");
    reply.appendChild(item);
    item.data = comment;
    item.attachReplies(comment.progeny);
  }

  unlink() {
    this.parentElement.parentElement.removeChild(this.parentElement);
  }
}

customElements.define("sz-item", ItemElement);

import "../simple/date_element.js";

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
        footer details {
          min-height: 1rem;
          max-height: 1.5rem;
          overflow: hidden;
          transition: all 1s ease;
        }
        footer details[open] {
          min-height: 5rem;
          max-height: 25rem;
        }
        footer details > summary:first-of-type {
          text-align: right;
          list-style-type: none;
        }
        footer details[open] > summary:first-of-type {
          list-style-type: none;
        }
        footer details > summary:first-of-type svg {
          width: 1em;
          height: 1em;
        }
        footer details > summary:first-of-type svg * {
          fill: var(--base07);
        }
        footer details[open] > summary:first-of-type svg path {
          display: none;
        }
        footer details:not([open]) > summary:first-of-type svg rect {
          display: none;
        }
        footer details textarea {
          width: 100%;
          box-sizing: border-box;
        }
      </style>

      <header>
        <strong id="name-field"></strong>
        <small><simple-date id="date-field"></simple-date></small>
      </header>
      <md-div id="message-field"></md-div>
      <footer>
        <details>
          <summary title="Reply to this message …">
            <svg version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <path d="m28 60v-16c2 0 29-1 36 20 0-34-21-44-36-44v-16l-28 28z"/>
              <rect y="24" width="64" height="16"/>
            </svg>
          </summary>
          <form>
            <textarea rows="5"></textarea>
          </form>
        </details>
      </footer>
    `;
  }

  set data(comment) {
    this.shadowRoot.querySelector("#name-field").innerText = comment.name;
    this.shadowRoot.querySelector("#date-field").innerText = comment.created_at;
    this.shadowRoot.querySelector("#message-field").innerText = comment.message;
  }
}

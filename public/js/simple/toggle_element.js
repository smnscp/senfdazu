export default class ToggleElement extends HTMLElement {
  static openSymbol = `<g><rect y="24" width="64" height="16"/><rect x="24" width="16" height="64"/></g>`;
  static closedSymbol = `<rect y="24" width="64" height="16"/>`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        details {
          min-height: 1rem;
          max-height: 1.5rem;
          overflow: hidden;
          transition: all 1s ease;
        }
        details[open] {
          min-height: 5rem;
          max-height: 25rem;
        }
        details > summary:first-of-type {
          text-align: right;
          list-style-type: none;
        }
        details[open] > summary:first-of-type {
          list-style-type: none;
        }
        details > summary:first-of-type svg {
          width: 1em;
          height: 1em;
        }
        details > summary:first-of-type svg * {
          fill: var(--base07);
        }
        details[open] > summary:first-of-type svg > :first-child {
          display: none;
        }
        details:not([open]) > summary:first-of-type svg > :last-child {
          display: none;
        }
      </style>

      <details>
        <summary title="${this.getAttribute("title") || "Toggle …"}">
          <svg viewBox="0 0 64 64">
            ${this.constructor.openSymbol}
            ${this.constructor.closedSymbol}
          </svg>
        </summary>
        <slot></slot>
      </details>
    `;
  }

  get open() {
    return this.shadowRoot.querySelector("details").open;
  }

  set open(val) {
    this.shadowRoot.querySelector("details").open = val;
  }
}

customElements.define("simple-toggle", ToggleElement);

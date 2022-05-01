export default class IconButtonElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline;
        }
        button {
          background: transparent;
          border: none;
          color: inherit;
        }
        button > svg {
          width: 1em;
          height: 1em;
        }
        button > svg * {
          fill: var(--text-color);
        }
        .screen-reader-text {
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
      </style>

      <button>
        <svg viewBox="0 0 64 64">
          ${this.constructor.symbol}
        </svg>
        <span class="screen-reader-text">
          <slot>${this.constructor.label}</slot>
        </span>
      </button>
    `;
  }
}

customElements.define("simple-icon-button", IconButtonElement);

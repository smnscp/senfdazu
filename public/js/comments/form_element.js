class FormElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        textarea {
          width: 100%;
          box-sizing: border-box;
        }
      </style>

      <form>
        <textarea rows="5"></textarea>
      </form>
    `;
  }
}

customElements.define("comments-form", FormElement);

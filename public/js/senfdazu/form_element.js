class FormElement extends HTMLElement {
  static get observedAttributes() {
    return ["action"];
  }

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

      <form action="${this.action}" method="post">
        <textarea rows="5"></textarea>
      </form>
    `;
  }

  get action() {
    return this.getAttribute("action");
  }

  set action(val) {
    this.setAttribute("action", val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "action":
        this.shadowRoot.querySelector("form").action = newValue;
        break;
    }
  }
}

customElements.define("sz-form", FormElement);

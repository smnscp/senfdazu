import ItemElement from "./item_element.js";

class RootElement extends ItemElement {
  static get observedAttributes() {
    return ["src"];
  }

  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <simple-toggle title="Comment on this article …">
        <sz-form></sz-form>
      </simple-toggle>
    `;
  }

  get parent() {
    return null;
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(val) {
    this.setAttribute("src", val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "src":
        this.load().then((comments) => {
          this.attachReplies(comments);
        });
        break;
    }
  }

  load() {
    this.innerHTML = "<p>loading …</p>";

    return fetch(this.src)
      .then((response) => {
        if (!response.ok) {
          this.innerHTML = "<p>Not available 🤷‍♂️</p>";
          throw new Error(`Response status was ${response.status}.`);
        }
        this.innerHTML = "";
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  }
}

customElements.define("sz-root", RootElement);

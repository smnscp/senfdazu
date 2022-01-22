import ListElement from "./list_element.js";

customElements.define("comments-list", ListElement, { extends: "ol" });

export default class RootElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }

  constructor() {
    super();
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
        this.load();
        break;
    }
  }

  load() {
    this.innerHTML = "<p>loading …</p>";

    fetch(this.src)
      .then((response) => {
        if (!response.ok) {
          this.innerHTML = "<p>Not available 🤷‍♂️</p>";
          throw new Error(`Response status was ${response.status}.`);
        }
        return response.json();
      })
      .then((comments) => {
        const list = document.createElement("ol", { is: "comments-list" });
        list.comments = comments;
        this.replaceChildren(list);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  }
}

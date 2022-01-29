import createList from "./create_list.js";

export default class RootElement extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
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
        const list = createList(comments);
        this.replaceChildren(list);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  }
}

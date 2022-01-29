import createList from "./create_list.js";

class RootElement extends HTMLElement {
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
        this.load().then((comments) => {
          this.replaceChildren(createList(comments));
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
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  }
}

customElements.define("comments-root", RootElement);

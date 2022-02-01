import IconButtonElement from "../simple/icon_button_element.js";

class DeleteButtonElement extends IconButtonElement {
  static symbol = `<path d="m30 0a10 10 0 0 0-9.78 8h-12.2c-2.22 0-4 1.78-4 4s1.78 4 4 4v36c0 6.65 5.35 12 12 12h20c6.65 0 12-5.35 12-12v-36c2.22 0 4-1.78 4-4s-1.78-4-4-4h-12.2a10 10 0 0 0-9.79-8zm0 4a6 6 0 0 1 5.66 4h-11.3a6 6 0 0 1 5.65-4zm-14 12h28v36c0 2.22-1.78 4-4 4h-20c-2.22 0-4-1.78-4-4v-36zm6 4c-1.11 0-2 0.892-2 2v24c0 1.11 0.892 2 2 2s2-0.892 2-2v-24c0-1.11-0.892-2-2-2zm8 0c-1.11 0-2 0.892-2 2v24c0 1.11 0.892 2 2 2s2-0.892 2-2v-24c0-1.11-0.892-2-2-2zm8 0c-1.11 0-2 0.892-2 2v24c0 1.11 0.892 2 2 2s2-0.892 2-2v-24c0-1.11-0.892-2-2-2z"/>`;
  static label = "Delete";

  static get observedAttributes() {
    return ["action"];
  }

  get action() {
    return this.getAttribute("action");
  }

  set action(val) {
    this.setAttribute("action", val);
  }

  get owner() {
    return this.closest(":not(* > *)").parentNode.host;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "action":
        const btn = this.shadowRoot.querySelector("button");
        btn.onclick = () => {
          window.confirm("You sure?") && this.submit(newValue);
        };
        break;
    }
  }

  submit(action) {
    return fetch(action, {
      method: "delete",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          alert("Deletion failed 😖");
          throw new Error(`Response status was ${response.status}.`);
        }
        this.owner.unlink();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error.message);
      });
  }
}

customElements.define("sz-delete-button", DeleteButtonElement);

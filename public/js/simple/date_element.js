import BaseElement from "../simple/base_element.js";

export default class DateElement extends BaseElement {
  render(text) {
    const date = new Date(text);
    this.innerHTML = date.toDateString();
    this.title = date.toString();
  }
}

customElements.define("simple-date", DateElement);

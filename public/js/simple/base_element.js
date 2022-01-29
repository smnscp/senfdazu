/**
 * A base class for simple custom elements.
 * Renders the element’s innerText in some special way.
 */
export default class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.render(this.innerText);
  }

  get innerText() {
    return super.innerText;
  }

  set innerText(text) {
    this.render(text);
  }

  /**
   * Override this in your sub-class.
   */
  render(text) {
    this.innerHTML = text;
  }
}

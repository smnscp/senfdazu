import ToggleElement from "../simple/toggle_element.js";

class ReplyToggleElement extends ToggleElement {
  static openSymbol = `<path d="m28 60v-16c2 0 29-1 36 20 0-34-21-44-36-44v-16l-28 28z"/>`;
}

customElements.define("comments-reply-toggle", ReplyToggleElement);

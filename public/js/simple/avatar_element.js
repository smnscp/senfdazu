import BaseElement from "../simple/base_element.js";
import { toSvg } from "https://cdn.jsdelivr.net/npm/jdenticon@3.1.1/dist/jdenticon-module.mjs";

export default class AvatarElement extends BaseElement {
  render(text) {
    this.innerHTML = toSvg(text, 64);
  }
}

customElements.define("simple-avatar", AvatarElement);

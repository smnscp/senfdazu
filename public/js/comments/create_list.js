import ItemElement from "./item_element.js";

customElements.define("comments-item", ItemElement);

export default function createList(comments) {
  const ol = document.createElement("ol");
  ol.className = "comments-list";
  for (var comment of comments) {
    const li = document.createElement("li");
    const ci = document.createElement("comments-item");
    ci.data = comment;
    li.appendChild(ci);
    ol.appendChild(li);
    if (comment.progeny.length) {
      const replies = createList(comment.progeny);
      li.appendChild(replies);
    }
  }
  return ol;
}

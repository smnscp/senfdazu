export default class ItemElement extends HTMLLIElement {
  constructor() {
    super();
  }

  get rootElement() {
    return this.parentElement.parentElement.rootElement;
  }

  connectedCallback() {
    const date = new Date(this.comment.created_at);

    this.innerHTML = `
      <header>
        <strong class="name-field">${this.htmlSafe(this.comment.name)}</strong>
        <small class="date-field" title="${date}">${date.toDateString()}</small>
      </header>
      <div class="message-field">
        ${this.processMessage(this.comment.message)}
      </div>
    `;

    const list = document.createElement("ol", { is: "comments-list" });
    list.comments = this.comment.progeny;
    this.appendChild(list);
  }

  htmlSafe(message) {
    return message.replaceAll("<", "&lt;");
  }

  processMessage(message) {
    return this.rootElement?.md
      ? this.rootElement.md.render(message)
      : this.htmlSafe(message);
  }
}

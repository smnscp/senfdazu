export default class ItemElement extends HTMLLIElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const date = new Date(this.comment.created_at);

    this.innerHTML = `
      <header>
        <strong class="name-field">${this.htmlSafe(this.comment.name)}</strong>
        <small class="date-field" title="${date}">${date.toDateString()}</small>
      </header>
      <md-div class="message-field">
        ${this.htmlSafe(this.comment.message)}
      </md-div>
    `;

    const list = document.createElement("ol", { is: "comments-list" });
    list.comments = this.comment.progeny;
    this.appendChild(list);
  }

  htmlSafe(message) {
    return message.replaceAll("<", "&lt;");
  }
}

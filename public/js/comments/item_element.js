export default class ItemElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <header>
        <strong id="name-field"></strong>
        <small id="date-field"></small>
      </header>
      <md-div id="message-field"></md-div>
      <comments-list></comments-list>
    `;
  }

  set data(comment) {
    this.shadowRoot.querySelector("#name-field").innerText = comment.name;

    const date = new Date(comment.created_at);
    const dateField = this.shadowRoot.querySelector("#date-field");
    dateField.innerText = date.toDateString();
    dateField.title = date.toString();

    this.shadowRoot.querySelector("#message-field").innerText = comment.message;

    this.shadowRoot.querySelector("comments-list").data = comment.progeny;
  }
}

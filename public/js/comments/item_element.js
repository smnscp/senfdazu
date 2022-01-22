export default class ItemElement extends HTMLLIElement {
  constructor() {
    super();
    this.innerHTML = `
      <header>
        <strong class="name-field"></strong>
        <small class="date-field"></small>
      </header>
      <md-div class="message-field"></md-div>
      <ol is="comments-list"></ol>
    `;
  }

  set data(comment) {
    this.querySelector(".name-field").innerText = comment.name;

    const date = new Date(comment.created_at);
    const dateField = this.querySelector(".date-field");
    dateField.innerText = date.toDateString();
    dateField.title = date.toString();

    this.querySelector(".message-field").innerText = comment.message;

    this.querySelector("[is=comments-list]").data = comment.progeny;
  }
}

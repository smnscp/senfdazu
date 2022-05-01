class FormElement extends HTMLElement {
  static get observedAttributes() {
    return ["action"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        * {
          box-sizing: border-box;
        }
        .form-row {
          display: flex;
          gap: 0.5rem;
        }
        .form-field {
          margin-bottom: 0.5rem;
          flex: 1;
        }
        .form-field input {
          width: 100%;
        }
        .form-field label {
          display: block;
          font-size: smaller;
          font-weight: bold;
        }
        textarea {
          width: 100%;
          box-sizing: border-box;
        }
        button[type=submit] {
          float: inline-end;
        }
      </style>

      <form>
      	<div class="form-row">
          <div class="form-field">
            <label for="name-input">Name:</label>
            <input id="name-input" name="name" required/>
          </div>
          <div class="form-field">
            <label for="email-input">Email:</label>
            <input type="email" id="email-input" name="email" required/>
          </div>
        </div>
      	<div class="form-field">
      		<label for="message-input">Message:</label>
      		<textarea id="message-input" name="message" required></textarea>
      	</div>
      	<button type="submit">Post comment</button>
      </form>
    `;
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
        const form = this.shadowRoot.querySelector("form");
        form.onsubmit = (event) => {
          this.submit(event.target, newValue).then((comment) => {
            if (comment) this.owner.appendReply(comment);
          });
          event.preventDefault();
        };
        break;
    }
  }

  submit(form, action) {
    return fetch(action, {
      method: "post",
      body: new FormData(form),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Post failed 😖");
          throw new Error(`Response status was ${response.status}.`);
        }
        form.reset();
        this.parentElement.open = false;
        return response.json();
      })
      .catch((error) => {
        console.error("Error posting comment:", error.message);
      });
  }
}

customElements.define("sz-form", FormElement);

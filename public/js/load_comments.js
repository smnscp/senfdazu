window.loadComments = function (selector, endpoint, processMessage) {
  const htmlSafe = (message) => message.replaceAll("<", "&lt;");
  processMessage = processMessage || htmlSafe;

  const container = document.querySelector(selector);
  container.innerHTML = "<p>loading …</p>";

  const renderComments = (comments) => {
    if (!comments?.length) return "";
    return `<ol class="comments">
      ${comments.map(renderComment).join("\n")}
    </ol>`;
  };

  const renderComment = (comment) => {
    const date = new Date(comment.created_at);
    return `<li class="comment">
      <header>
        <strong class="name">${htmlSafe(comment.name)}</strong>
        <small class="date" title="${date}">${date.toDateString()}</small>
      </header>
      <div class="message">${processMessage(comment.message)}</div>
      ${renderComments(comment.progeny)}
    </li>`;
  };

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        container.innerHTML = "<p>Not available 🤷‍♂️</p>";
        throw new Error(`Response status was ${response.status}.`);
      }
      return response.json();
    })
    .then((comments) => {
      container.innerHTML = renderComments(comments);
    })
    .catch((error) => {
      console.error("Error fetching comments:", error.message);
    });
};

let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks() {
  const container = document.getElementById("links");
  container.innerHTML = "";

  links.forEach((item) => {
    const div = document.createElement("div");
    div.className = "link-card";
    div.innerHTML = `
      <strong>${item.name}</strong><br>
      <a href="${item.link}" target="_blank">${item.link}</a>
    `;
    container.appendChild(div);
  });
}

function addLink() {
  const name = document.getElementById("name").value;
  const link = document.getElementById("link").value;

  if (!name || !link) return;

  links.push({ name, link });
  localStorage.setItem("links", JSON.stringify(links));

  renderLinks();
}

renderLinks();

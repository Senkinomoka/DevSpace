const titulo = document.getElementById("titulo");
const contenido = document.getElementById("contenido");
const categoria = document.getElementById("categoria");
const lista = document.getElementById("lista");

/* VALIDACIÓN + GUARDADO */
function guardarPost() {
  if (!titulo.value.trim() || !contenido.value.trim()) {
    mostrarToast("Completa los campos");
    return;
  }

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const nuevo = {
    titulo: titulo.value.trim(),
    contenido: contenido.value.trim(),
    categoria: categoria.value || "General",
    fecha: new Date().toLocaleString()
  };

  posts.unshift(nuevo);
  localStorage.setItem("posts", JSON.stringify(posts));

  limpiar();
  render();
  mostrarToast("Publicado correctamente");

  scrollFeed();
}

/* LIMPIAR */
function limpiar() {
  titulo.value = "";
  contenido.value = "";
  categoria.value = "";
}

/* RENDER */
function render() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  lista.innerHTML = "";

  posts.forEach((p) => {
    const item = document.createElement("div");
    item.className = "post";

    item.innerHTML = `
      <h3>${p.titulo}</h3>
      <span>${p.categoria}</span>
      <pre><code>${escapeHTML(p.contenido)}</code></pre>
      <small>${p.fecha}</small>
    `;

    lista.appendChild(item);
  });
}

/* SEGURIDAD */
function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* SCROLL */
function scrollFeed() {
  document.querySelector(".feed").scrollIntoView({
    behavior: "smooth"
  });
}

/* TOAST */
function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

/* INIT */
render();

const textarea = document.getElementById("poema");
const contador = document.getElementById("contador");
const boton = document.getElementById("descargar");

/* 🔹 Cargar poema guardado */
textarea.value = localStorage.getItem("poema") || "";

/* 🔹 Contador */
function actualizarContador() {
  const texto = textarea.value.trim();
  const palabras = texto === "" ? 0 : texto.split(/\s+/).length;
  const lineas = texto === "" ? 0 : texto.split("\n").length;

  contador.textContent = `${palabras} palabras | ${lineas} líneas`;
}

/* 🔹 Guardado automático */
textarea.addEventListener("input", () => {
  localStorage.setItem("poema", textarea.value);
  actualizarContador();
});

/* 🔹 Máquina de escribir (suave) */
textarea.addEventListener("keydown", () => {
  textarea.style.transition = "0.05s";
});

/* 🔹 Descargar poema */
boton.addEventListener("click", () => {
  const blob = new Blob([textarea.value], { type: "text/plain" });
  const enlace = document.createElement("a");

  enlace.href = URL.createObjectURL(blob);
  enlace.download = "mi_poema.txt";
  enlace.click();
});

/* Inicial */
actualizarContador();
const compartir = document.getElementById("compartir");

compartir.addEventListener("click", () => {
  const texto = textarea.value;

  if (navigator.share) {
    navigator.share({
      title: "Mi poema",
      text: texto,
      url: window.location.href
    });
  } else {
    alert("Tu navegador no permite compartir directamente.");
  }
});
const titulo = document.getElementById("titulo");

/* Guardar múltiples poemas */
function guardarPoema() {
  const poemas = JSON.parse(localStorage.getItem("poemas")) || [];

  const nuevo = {
    titulo: titulo.value || "Sin título",
    contenido: textarea.value,
    fecha: new Date().toLocaleString()
  };

  poemas.push(nuevo);
  localStorage.setItem("poemas", JSON.stringify(poemas));

  alert("Poema guardado ✅");
}
function mostrarPoemas() {
  const lista = document.getElementById("lista");
  const poemas = JSON.parse(localStorage.getItem("poemas")) || [];

  lista.innerHTML = "";

  poemas.forEach((p) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <h3>${p.titulo}</h3>
      <p>${p.contenido}</p>
      <small>${p.fecha}</small>
      <hr>
    `;
    lista.appendChild(item);
  });
}
mostrarPoemas();

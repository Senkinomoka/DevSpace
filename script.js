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
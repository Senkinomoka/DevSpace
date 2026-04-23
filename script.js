const textarea = document.getElementById("poema");
const titulo = document.getElementById("titulo");
const lista = document.getElementById("lista");

const { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } = window.firebaseTools;
const db = window.db;

/* PUBLICAR */
async function guardarPoema() {
  await addDoc(collection(db, "poemas"), {
    titulo: titulo.value || "Sin título",
    contenido: textarea.value,
    fecha: new Date().toLocaleString()
  });

  textarea.value = "";
  titulo.value = "";

  querySnapshot.forEach((docu) => {
  const data = docu.data();

  const item = document.createElement("div");
  item.classList.add("post");

  item.innerHTML = `
    <h3 contenteditable="true">${data.titulo}</h3>
    <p contenteditable="true">${data.contenido}</p>
    <small>${data.fecha}</small>
    
    <br>
    <button onclick="editar('${docu.id}', this)">Guardar cambios</button>
    <button onclick="eliminar('${docu.id}')">Eliminar</button>

    <div class="comentarios">
      <h4>💬 Comentarios</h4>
      <div id="comentarios-${docu.id}"></div>

      <input type="text" placeholder="Escribe un comentario..." id="input-${docu.id}">
      <button onclick="agregarComentario('${docu.id}')">Enviar</button>
    </div>
  `;

  lista.appendChild(item);

  cargarComentarios(docu.id);
});

/* ELIMINAR */
async function eliminar(id) {
  await deleteDoc(doc(db, "poemas", id));
  mostrarPoemas();
}

/* EDITAR */
async function editar(id, btn) {
  const post = btn.parentElement;
  const nuevoTitulo = post.querySelector("h3").innerText;
  const nuevoContenido = post.querySelector("p").innerText;

  await updateDoc(doc(db, "poemas", id), {
    titulo: nuevoTitulo,
    contenido: nuevoContenido
  });

  alert("Actualizado ✅");
}

mostrarPoemas();

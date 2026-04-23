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
  <h3>${p.titulo}</h3>
  <p>${p.contenido}</p>
  <small>${p.fecha}</small>
`;
    
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
async function agregarComentario(postId) {
  const input = document.getElementById(`input-${postId}`);
  const texto = input.value;

  if (!texto.trim()) return;

  await addDoc(collection(db, "comentarios"), {
    postId: postId,
    texto: texto,
    fecha: new Date().toLocaleString()
  });

  input.value = "";
  cargarComentarios(postId);
}
async function cargarComentarios(postId) {
  const contenedor = document.getElementById(`comentarios-${postId}`);
  contenedor.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "comentarios"));

  querySnapshot.forEach((docu) => {
    const data = docu.data();

    if (data.postId === postId) {
      const div = document.createElement("div");
      div.classList.add("comentario");

      div.innerHTML = `
        <p>${data.texto}</p>
        <small>${data.fecha}</small>
      `;

      contenedor.appendChild(div);
    }
  });
}
setTimeout(() => {
  item.style.animationDelay = `${index * 0.05}s`;
}, 0);
item.style.opacity = 0;

setTimeout(() => {
  item.style.transition = "0.4s";
  item.style.opacity = 1;
}, 50);

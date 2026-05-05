const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let escalas = [];

db.collection("escalas").onSnapshot(snapshot => {
  escalas = [];
  snapshot.forEach(doc => {
    escalas.push({ id: doc.id, ...doc.data() });
  });

  renderCalendario();
});

function renderCalendario() {
  const div = document.getElementById("calendario");
  div.innerHTML = "";

  const dias = 31;

  for (let i = 1; i <= dias; i++) {
    const data = `2026-05-${String(i).padStart(2, "0")}`;

    const temEscala = escalas.find(e => e.data === data);

    const el = document.createElement("div");
    el.className = "dia";
    el.innerHTML = `<strong>${i}</strong>`;

    if (temEscala) {
      el.classList.add("ativo");
      el.onclick = () => abrirModal(temEscala);
    }

    div.appendChild(el);
  }
}

function abrirModal(escala) {
  document.getElementById("modal").classList.remove("hidden");

  document.getElementById("detalhes").innerHTML = `
    <h2>${escala.celebracao}</h2>
    <p><b>Data:</b> ${escala.data}</p>
    <p><b>Hora:</b> ${escala.hora}</p>
    <p><b>Ministros:</b> ${escala.ministros.join(", ")}</p>
    <p><b>Obs:</b> ${escala.observacoes}</p>
  `;
}

function fecharModal() {
  document.getElementById("modal").classList.add("hidden");
}

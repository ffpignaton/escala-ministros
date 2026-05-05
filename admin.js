const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function salvarEscala() {
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const celebracao = document.getElementById("celebracao").value;
  const ministros = document.getElementById("ministros").value.split(",");
  const obs = document.getElementById("obs").value;

  db.collection("escalas").add({
    data,
    hora,
    celebracao,
    ministros,
    observacoes: obs
  }).then(() => {
    alert("Escala salva com sucesso!");
  });
}

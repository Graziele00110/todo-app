let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarMensagem(texto, tipo) {
  let msg = document.getElementById("mensagem");
  msg.innerText = texto;
  msg.className = `mensagem ${tipo}`;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);
}

function adicionarTarefa() {
  let input = document.getElementById("tarefa");
  let texto = input.value.trim();

  if (texto === "") {
    mostrarMensagem("Digite uma tarefa!", "erro");
    return;
  }

  tarefas.push({ texto, concluida: false });
  input.value = "";

  salvar();
  atualizarLista();
  mostrarMensagem("Tarefa adicionada!", "sucesso");
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  let contador = document.getElementById("contador");

  lista.innerHTML = "";

  let filtradas = tarefas.filter(t => {
    if (filtroAtual === "pendentes") return !t.concluida;
    if (filtroAtual === "concluidas") return t.concluida;
    return true;
  });

  contador.innerText = `Total: ${tarefas.length}`;

  filtradas.forEach((tarefa, index) => {
    let li = document.createElement("li");

    if (tarefa.concluida) {
      li.classList.add("concluida");
    }

    li.innerHTML = `
      <span onclick="toggle(${index})">${tarefa.texto}</span>
      <button onclick="remover(${index})">🗑️</button>
    `;

    lista.appendChild(li);
  });
}

function toggle(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvar();
  atualizarLista();
}

function remover(index) {
  tarefas.splice(index, 1);
  salvar();
  atualizarLista();
  mostrarMensagem("Tarefa removida!", "sucesso");
}

function limparConcluidas() {
  tarefas = tarefas.filter(t => !t.concluida);
  salvar();
  atualizarLista();
  mostrarMensagem("Concluídas removidas!", "sucesso");
}

function filtrar(tipo) {
  filtroAtual = tipo;
  atualizarLista();
}

atualizarLista();
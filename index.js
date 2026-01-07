const Lista = document.getElementById("Lista");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const busca = document.getElementById("busca");
const overlay = document.getElementById("overlay");
const criarTarefa = document.getElementById("criarTarefa");
const mensagemVazia = document.getElementById("mensagemVazia");

// ================= MODAL =================
function abriModal() {
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal() {
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

// ================= LOCAL STORAGE =================
function getTarefas() {
    return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function setTarefas(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ================= LISTAR =================
function buscarTarefas() {
    Lista.innerHTML = "";

    const tarefas = getTarefas();

    if (tarefas.length === 0) {
        mensagemVazia.style.display = "block";
        return;
    }

    mensagemVazia.style.display = "none";

    tarefas.forEach(tarefa => {
        Lista.innerHTML += `
            <li>
                <h5>${tarefa.titulo}</h5>
                <p>${tarefa.descricao}</p>
                <div class="actions">
                    <box-icon 
                        name="trash" 
                        size="sm"
                        onclick="deletarTarefa(${tarefa.id})">
                    </box-icon>
                </div>
            </li>
        `;
    });
}

buscarTarefas();

// ================= CRIAR =================
function novaTarefa(event) {
    event.preventDefault();

    const tarefas = getTarefas();

    const tarefa = {
        id: Date.now(), // ID único
        titulo: titulo.value,
        descricao: descricao.value
    };

    tarefas.push(tarefa);
    setTarefas(tarefas);

    fecharModal();
    buscarTarefas();

    document.querySelector("#criarTarefa form").reset();
}

// ================= DELETAR =================
function deletarTarefa(id) {
    let tarefas = getTarefas();
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(tarefas);
    buscarTarefas();
}

// ================= BUSCAR =================
function pesquisarTarefa() {
    const texto = busca.value.toLowerCase();
    const lis = document.querySelectorAll("#Lista li");

    lis.forEach(li => {
        const titulo = li.querySelector("h5").innerText.toLowerCase();
        li.classList.toggle("oculto", !titulo.includes(texto));
    });
}

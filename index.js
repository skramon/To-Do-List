const overlay = document.getElementById("overlay");
const criarTarefa = document.getElementById("criarTarefa");
const Lista = document.getElementById("Lista");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const busca = document.getElementById("busca");
const toggleThemeBtn = document.getElementById("toggleTheme");
const iconTheme = document.getElementById("iconTheme");

function toggleTheme() {
    document.body.classList.toggle("dark");
    const darkAtivo = document.body.classList.contains("dark");
    localStorage.setItem("theme", darkAtivo ? "dark" : "light");
    iconTheme.setAttribute("name", darkAtivo ? "sun" : "moon");
}

(function carregarTema() {
    const temaSalvo = localStorage.getItem("theme");
    if (temaSalvo === "dark") {
        document.body.classList.add("dark");
        iconTheme.setAttribute("name", "sun");
    } else {
        iconTheme.setAttribute("name", "moon");
    }
})();

function abriModal() {
    overlay.classList.add('active');
    criarTarefa.classList.add('active');
}

function fecharModal() {
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}

function buscarTarefas() {
    Lista.innerHTML = '';
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    adicionarTarefa(tarefas);
}

buscarTarefas();

function adicionarTarefa(listaDeTarefas) {
    if (listaDeTarefas.length > 0) {
        listaDeTarefas.forEach((tarefa, index) => {
            Lista.innerHTML += `
            <li>
                <h5>${tarefa.titulo}</h5>
                <p>${tarefa.descricao}</p>
                <div class="actions">
                    <box-icon name='trash' size='smcs' onclick="deletarTarefa(${index})"></box-icon>
                </div>
            </li>
            `;
        });
    }

    const mensagemVazia = document.getElementById("mensagemVazia");
    if (Lista.children.length > 0) {
        mensagemVazia.innerText = `${Lista.children.length} Tarefas registradas`;
    } else {
        mensagemVazia.innerText = "Nenhuma tarefa registrada";
    }
}

function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function novaTarefa(event) {
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    };
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(tarefa);
    salvarTarefas(tarefas);
    fecharModal();
    buscarTarefas();
    document.querySelector("#criarTarefa form").reset();
}

function deletarTarefa(id) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(id, 1);
    salvarTarefas(tarefas);
    buscarTarefas();
}

function pesquisarTarefa() {
    const lis = document.querySelectorAll("ul li");
    if (busca.value.length > 0) {
        lis.forEach(li => {
            if (!li.children[0].innerText.toLowerCase().includes(busca.value.toLowerCase())) {
                li.classList.add("oculto");
            } else {
                li.classList.remove("oculto");
            }
        });
    } else {
        lis.forEach(li => li.classList.remove("oculto"));
    }
}

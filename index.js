function novaTarefa(){
    overlay.classList.add('active');
    criarTarefa.classList.add('active');
}

function fecharModal(){
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}

function buscarTarefas(){
    fetch('http://localhost:3000/tarefas')
    .then(res => res.json())
    .then(res => {
        adicionarTarefa(res);
    })
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    adicionarTarefa(tarefas);
} buscarTarefas();

function adicionarTarefa(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        listaDeTarefas.map(tarefa => {
            Lista.innerHTML += `
            <li>
                <h5>${tarefa.titulo}</h5>
                <p> ${tarefa.descricao}</p>
                <div class="actions">
                    <box-icon name='trash' size='smcs'></box-icon>
                </div>
            </li>
            `;
        })
    }
}

function salvarTarefa(novaTarefa) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function alternarTema() {
    document.body.classList.toggle('dark-mode');
    const tema = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('tema', tema);
}

// Verifica a preferência salva ao carregar
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
    document.body.classList.add('dark-mode');
}
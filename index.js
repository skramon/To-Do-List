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
    .then(res => res.json())
    .then(res => {
    })
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
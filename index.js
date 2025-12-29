function buscarTarefas(){
    Lista.innerHTML = '';
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
                    <box-icon name='trash' size='smcs' onclick="deletarTarefa(${tarefa.id})"></box-icon>
                </div>
            </li>
            `;
        })
    }

    const contador = document.getElementById("contador");
    const qtd = Lista.children.length;
    if (qtd > 0) {
        contador.innerText = `${qtd} Tarefas registradas`;
    } else {
        contador.innerText = "Nenhuma tarefa registrada";
    }
}

function salvarTarefa(novaTarefa) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(novaTarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function novaTarefa(){
    event.preventDefault();

    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
    };

function abriModal(){
    overlay.classList.add('active');
    criarTarefa.classList.add('active');
}

function fecharModal(){
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}

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

   fetch("http://localhost:3000/tarefas",
   {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(tarefa)
   })
   .then(res => res.json())
   .then(res => {
       console.log(res);
       fecharModal();
       buscarTarefas();
       let fomr = document.querySelector("#criarTarefa form");
       fomr.reset();
   })
}

function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`,
    {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        buscarTarefas();
    })
}

function pesquisarTarefa(){
    let lis = document.querySelectorAll("ul li");
    if(busca.value.length > 0){
        lis.forEach(li => {
            if (!li.children[0].innerText.includes(busca.value)){
                li.classList.add("oculto");
            }else{
                li.classList.remove("oculto");
            }
        })
    } else {
        lis.forEach(li => {
            li.classList.remove("oculto");
        })
    }

}
const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keycode === 13) {
        if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
     inputTarefa.value = '';
     inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const criaBotaoApagar = document.createElement('button');
    criaBotaoApagar.innerText = 'apagar';
    //criaBotaoApagar.classList.add('apagar');
    criaBotaoApagar.setAttribute('class', 'apagar');
    criaBotaoApagar.setAttribute('title', 'apagar esta tarefa');
    li.appendChild(criaBotaoApagar);
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput; 
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();

}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '').trim();
        listaTarefas.push(tarefaTexto);
    }
        
    const tarefasJSON = JSON.stringify(listaTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
    
};

function addTarefasSalavas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas);
    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa);
    }
};

addTarefasSalavas();
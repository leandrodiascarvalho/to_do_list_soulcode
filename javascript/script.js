document.addEventListener("DOMContentLoaded", function () {
  // Carregar tarefas do armazenamento local (se houver)
  loadTasks();

  // Adicionar evento de clique ao botão de adicionar
  document
    .getElementById("taskForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Impede o envio do formulário padrão
      addTask();
    });
});

function addTask() {
  // Obter o valor da nova tarefa
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  // Verificar se a entrada não está vazia
  if (taskText !== "") {
    // Criar um novo elemento de lista
    let newTask = document.createElement("li");
    newTask.n;
    innerHTML = `
          <span>${taskText}</span>
          <button onclick="toggleTask(this)">Concluir</button>
          <button onclick="deleteTask(this)">Excluir</button>
      `;

    // Adicionar a nova tarefa à lista
    document.getElementById("taskList").appendChild(newTask);

    // Limpar o campo de entrada
    taskInput.value = "";

    // Salvar a lista de tarefas no armazenamento local
    saveTasks();
  }
}

function toggleTask(button) {
  // Alternar a classe 'completed' da tarefa
  let task = button.parentNode;
  task.classList.toggle("completed");

  // Alterar o texto do botão com base no estado da tarefa
  let buttonText = task.classList.contains("completed")
    ? "Desfazer"
    : "Concluir";
  button.textContent = buttonText;

  // Salvar a lista de tarefas no armazenamento local
  saveTasks();
}

function deleteTask(button) {
  // Remover a tarefa da lista
  let task = button.closest("li"); // Encontrar o elemento pai 'li' mais próximo
  if (task) {
    task.remove(); // Utilizar o método 'remove()' para remover o elemento
    // Salvar a lista de tarefas no armazenamento local (chamando a função saveTasks)
    saveTasks();
  }
}
//function deleteCompletedTasks() {
// Obter todas as tarefas concluídas
//let completedTasks = document.querySelectorAll("#taskList .completed");

// Remover cada tarefa concluída da lista
//completedTasks.forEach(function (task) {
//task.parentNode.removeChild(task);
// });

// Salvar a lista de tarefas no armazenamento local
//   saveTasks();
// }

function saveTasks() {
  // Obter todas as tarefas
  let tasks = document.querySelectorAll("#taskList li");

  // Criar uma matriz para armazenar as tarefas
  let taskArray = [];

  // Adicionar cada tarefa à matriz
  tasks.forEach(function (task) {
    let taskTextElement = task.querySelector("span");

    // Verificar se o elemento 'span' foi encontrado
    if (taskTextElement) {
      let taskText = taskTextElement.innerText;
      let isCompleted = task.classList.contains("completed");
      taskArray.push({ text: taskText, completed: isCompleted });
    }
  });

  // Converter a matriz de tarefas em uma string JSON e armazenar no localStorage
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTasks() {
  // Obter a string JSON das tarefas do localStorage
  let tasksString = localStorage.getItem("tasks");

  // Verificar se há tarefas armazenadas
  if (tasksString) {
    // Converter a string JSON de volta para uma matriz e adicionar as tarefas à lista
    let tasksArray = JSON.parse(tasksString);
    tasksArray.forEach(function (task) {
      let newTask = document.createElement("li");
      newTask.innerHTML = `
              <span>${task.text}</span>
              <button onclick="toggleTask(this)">${
                task.completed ? "Desfazer" : "Concluir"
              }</button>
              <button onclick="deleteTask(this)">Excluir</button>
          `;
      if (task.completed) {
        newTask.classList.add("completed");
      }
      document.getElementById("taskList").appendChild(newTask);
    });
  }
}

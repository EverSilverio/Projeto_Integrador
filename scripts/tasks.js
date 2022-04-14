const urlGetUser = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';
const urlTasks = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
const jwt = JSON.parse(localStorage.getItem('login')).jwt;

const novaTarefa = document.getElementById('novaTarea');
const skeleton = document.getElementById('skeleton');
const tarefasPendentes = document.querySelector('.tarefas-pendentes');
const tarefasTerminadas = document.querySelector('.tarefas-terminadas');

// metodo handle status tarefa
function clickTask(id, completed) {
   const data = {
      completed: !completed
   };

   const settings = {
      method: 'PUT',
      headers: {
         'content-type': 'application/json',
         authorization: jwt
      },
      body: JSON.stringify(data)
   }

   fetch(urlTasks + '/' + id, settings)
      .then(response => {
         return response.json()
      })
      .then(task => {
         console.log(task);
         carregaTasks();
      })
}

// metodo delete tarefa
function removeTask(id) {
   console.log(`remove ${id}`);

   const settings = {
      method: 'DELETE',
      headers: {
         'content-type': 'application/json',
         authorization: jwt
      }
   }

   fetch(urlTasks + '/' + id, settings)
      .then(response => {
         return response.json()
      })
      .then(task => {
         console.log(task);
         carregaTasks();
      })
}

// metodo para obter lista de tarefas
const carregaTasks = function() {
   const settings = {
      method: 'GET',
      headers: {
         authorization: jwt
      }
   };

   fetch(urlTasks, settings)
      .then(response => response.json())
      .then(tasks => {
         console.log(tasks);

         renderizarTasks(tasks);

      })
      .catch(err => {
         console.log(err);
         alert("Falha no login!")
      });
}

// renderiza tarefas na tela
const renderizarTasks = function(tasks) {
   // remove visualização do skeleton
   skeleton.style.display = 'none';

   // listar as tarefas
   tarefasPendentes.innerHTML = '';
   tarefasTerminadas.innerHTML = '';

   tasks.forEach(task => {
      let date = new Date(task.createdAt);
      date.toLocaleDateString('pt-BR');

      // console.log(date.getFullYear());
      date = date.getDate() +
         "/" + (date.getMonth() + 1) +
         "/" + date.getFullYear();

      if (task.completed) {
         tarefasTerminadas.innerHTML += templateTask(task, date);
      } else {
         tarefasPendentes.innerHTML += templateTask(task, date);
      }
   });
}

// retorna template tarefa
const templateTask = function(task, date) {
   let template = '';

   if (task.completed) {
      template = `
         <li class="tarefa" id="id${task.id}">
            <div class="done"></div>
            <div class="descricao">
            <p class="nome">${task.description}</p>
            <div>
               <button onclick="clickTask(${task.id}, true)"><i class="fas fa-undo-alt change"></i></button>
               <button onclick="removeTask(${task.id})"><i class="far fa-trash-alt"></i></button>
            </div>
            </div>
         </li>
         `;
   } else {
      template = `
         <li class="tarefa">
            <div class="not-done" onclick="clickTask(${task.id}, false)"></div>
            <div class="descricao">
               <p class="nome">${task.description}</p>
               <p class="timestamp">Criada em: ${date}</p>
            </div>
         </li>      
      `;
   }

   return template;
}

// metodo para criar nova tarefa
const criarTask = function() {
   const data = {
      description: novaTarefa.value,
      completed: false
   };

   const settings = {
      method: 'POST',
      headers: {
         'content-type': 'application/json',
         Authorization: jwt
      },
      body: JSON.stringify(data)
   };

   fetch(urlTasks, settings)
      .then(response => {
         // if (response.status === 201) {
         return response.json()
            // }
            // throw response;
      })
      .then(res => {
         carregaTasks();
         novaTarefa.value = '';
      })
      .catch(err => {
         console.log(err);
         alert("Falha no login!")
      });
}

window.addEventListener('load', function() {
   const formNovaTarefa = document.querySelector('.nova-tarefa')
   const userinfo = document.querySelector('.user-info p');

   // metodo para obter nome do usuario
   const carregaUsuario = function() {
      const settings = {
         method: 'GET',
         headers: {
            authorization: jwt
         },
      };

      fetch(urlGetUser, settings)
         .then(response => {
            // if (response.status === 201) {
            return response.json()
               // }
               // throw response;
         })
         .then(res => {
            console.log(res);
            atualizaNome(res.firstName, res.lastName);
         })
         .catch(err => {
            console.log(err);
            alert("Falha no login!")
         });
   }

   // funcao ira atualizar nome no userinfo
   const atualizaNome = function(firstname, lastname) {
      userinfo.innerHTML = firstname + ' ' + lastname;
   }

   // obtem usuario
   carregaUsuario();

   // listar as tarefas
   carregaTasks();

   // adiciona evento de criar ao tarefa ao botan "+"
   formNovaTarefa.addEventListener('submit', function(ev) {
      ev.preventDefault();
      criarTask();
   })

});
const inputEmail = document.getElementById('inputEmail');
const labelEmail = document.querySelector("#labelEmail");

const inputPassword = document.getElementById('inputPassword');
const labelPassword = document.querySelector("#labelPassword");

const errorMsg = document.querySelector("#errorMsg");

const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const urlLogin = 'https://ctd-todo-api.herokuapp.com/v1/users/login';

function entrar(ev) {

   let email = inputEmail.value.toLowerCase();
   inputEmail.value = email;
   let pass = inputPassword.value

   // iniciou o processo de registro
   mostrarSpinner();

   if (regexMail.test(email)) {
      const data = {
         email: email,
         password: pass,
      };

      const settings = {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         body: JSON.stringify(data),
      };

      fetch(urlLogin, settings)
         .then(response => {
            if (response.status === 201) {
               return response.json()
            }
            throw response;
         })
         .then(info => {
            localStorage.setItem('login', JSON.stringify({ email: email, jwt: info.jwt }));
            ocultarSpinner();
            location.href = 'tarefas.html';
         })
         .catch(err => {
            console.log(err);
            ocultarSpinner();
            errorLogin()
         });
   } else {
      ocultarSpinner();
      errorLogin()
   }
}

function errorLogin() {
   inputEmail.setAttribute('style', 'border-color:red')
   labelEmail.setAttribute('style', 'color:red')

   inputPassword.setAttribute('style', 'border-color:red')
   labelPassword.setAttribute('style', 'color:red')

   errorMsg.setAttribute('style', 'display: block')
   errorMsg.innerHTML = `Email ou Senha incorretos!`

   inputEmail.focus()
}
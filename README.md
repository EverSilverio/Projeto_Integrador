# TO DO APP
## PROJETO INTEGRADOR - FRONT END II
### Equipe 4
- Lucas Rosa
- Guilherme Brasil Tourinho
- J. Felipe S. Barbosa
- Everton Silverio
- Eduardo Russo

# Signup, Login and App pages:

![1](https://user-images.githubusercontent.com/86390899/161307824-d0e317c3-c236-410e-b130-76235f0af80a.png)
![2](https://user-images.githubusercontent.com/86390899/161307835-3a4012e8-7c07-4d61-9ace-234091ee2ffa.png)
![3](https://user-images.githubusercontent.com/86390899/164068002-f1cb51b9-351f-4808-857a-cf587170c389.png)

# Description

A simple signup and login system that grants access to a To Do List App screen.

## The signup screen rules and functions:
* Do not accept less than 3 characters in the Name and Nickname inputs;
* Regex for email function applied;
* 6+ characters password only;
* Data is stored in the browser (localstorage).
* Data is also stored in [CTD API](https://ctd-todo-api.herokuapp.com/).

## The login screen rules and functions:
* User can only access the app with the credentials registred on the signup page;
* Login is only authorized if the data are the same as those registered in the [CTD API](https://ctd-todo-api.herokuapp.com/);
* It checks if the entry information is correct;
* If the entry information is not correct it tells the user to do entry it correctly;
* When the entry information is correct the user can enter the app screen.

## The To Do List app screen:
* Gets access from login page;
* Shows users names on the screen;
* It's able to identify if the user is logged in or not;
* On "Finalizar Sessão" click the token access and the currently user are cleared from the localstorage;
* It is possible to add, delete, set as complete and recycle tasks at any time;
* Data persistence.

# Technologies:
* HTML;
* CSS;
* JavaScript;
* CTD API;
* Fetch API.


[Exemplo](https://eversilverio.github.io/DH/FrontEnd_II/proj_integrador/index.html)

### Login teste:
> e-mail: jonjon@gemail.com
> 
> senha: js123456

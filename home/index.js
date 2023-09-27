//selector
//user create
const formC = document.querySelector('#form-create')
const userInput = document.querySelector('#create-input')
//user login
const formL = document.querySelector('#form-login')
const loginInput = document.querySelector('#login-input')
const noti = document.querySelector('.notification')
//evento asocido al create user
formC.addEventListener('submit', async e => {
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users', { method: 'GET' })
    const users = await respuesta.json();
    //console.log(users);
    const user = users.find(user => user.username === userInput.value)

    if (!userInput.value) {
        noti.innerHTML = "El campo de usuario no puede estar vacio";
        noti.classList.add('show-notification');
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 3000);
    } else if (user) {
        //usuario existe
        noti.innerHTML = "El usuario ingresado ya existe";
        noti.classList.add('show-notification');
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 3000);
    } else {
        //agregar datos a la db
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json'
            },
            body: JSON.stringify({ username: userInput.value })
        });

        noti.innerHTML = `El usuario ${userInput.value} ha sido creado satisfactoriamente`;
        noti.classList.add('show-notification')
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 3000);
        userInput.value = ''
    }
})

formL.addEventListener('submit', async e => {
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users', { method: 'GET' })
    const users = await respuesta.json();
    //console.log(users);
    const user = users.find(user => user.username === loginInput.value)

    if (!user) {
        noti.innerHTML = "El usuario no existe";
        noti.classList.add('show-notification');
        setTimeout(() => {
            noti.classList.remove('show-notification')
        }, 3000);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';
    }
})
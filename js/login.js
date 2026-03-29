const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

const USUARIOS = await getData('http://localhost:3000/usuarios');

async function loginUser(username, password) {
    try {
        const usuario = USUARIOS.find(u => u.name === username && u.password === password);

        if (!usuario) {
            showLoginError("Usuario o contraseña incorrectos");
            return;
        }

        sessionStorage.setItem('userId', usuario.id);
        window.location.href = './user-info.html';

    } catch (error) {
        showLoginError("No se pudo conectar con el servidor. Inténtalo de nuevo.");
        console.error(error);
    }
}

function showLoginError(message) {
    let errorBox = document.getElementById('login-error');
    if (!errorBox) {
        errorBox = document.createElement('p');
        errorBox.id = 'login-error';
        errorBox.style.color = 'red';
        document.getElementById('login-form').prepend(errorBox);
    }
    errorBox.textContent = message;
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = [...document.querySelectorAll('#login-form input')];
    inputs.forEach(validate);
    if (!document.getElementById('login-form').checkValidity()) return;

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    await loginUser(username, password);
});
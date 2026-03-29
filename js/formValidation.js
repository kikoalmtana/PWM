const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

const USUARIOS = await getData('http://localhost:3000/usuarios');

const form = document.querySelector('form');
const inputs = [...form.querySelectorAll('input, textarea, select')];

function validate(input) {
    input.setCustomValidity("");
    const v = input.validity;

    let errorMsg = "";

    if (v.valueMissing)          errorMsg = input.dataset.errorRequired || "Campo obligatorio";
    else if (v.tooShort)         errorMsg = input.dataset.errorShort    || "Demasiado corto";
    else if (v.tooLong)          errorMsg = input.dataset.errorLong     || "Demasiado largo";
    else if (v.typeMismatch)     errorMsg = input.dataset.errorType     || "Formato inválido";
    else if (v.patternMismatch)  errorMsg = input.dataset.errorPattern  || "Formato incorrecto";

    if (!errorMsg && input.dataset.match) {
        const matchInput = document.getElementById(input.dataset.match);
        if (matchInput && input.value !== matchInput.value) {
            errorMsg = input.dataset.errorMatch || "Los campos no coinciden";
        }
    }

    if (!errorMsg && input.dataset.validateDni !== undefined) {
        if (!validateDNI(input.value)) {
            errorMsg = "El DNI no es válido";
        }
    }

    input.setCustomValidity(errorMsg);

    const small = document.querySelector(`[data-error-for="${input.id}"]`);
    if (small) {
        small.textContent = errorMsg;
    }
}

function validateDNI(dni) {
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';

    if (!dniRegex.test(dni.toUpperCase())) return false;

    const number = parseInt(dni.slice(0, 8));
    const letter = dni.slice(-1).toUpperCase();

    return letters[number % 23] === letter;
}

inputs.forEach(input => input.addEventListener('blur', () => {
    input.classList.add('touched');
    validate(input);
}, { once: true }));

async function loginUser(username, password) {

    try {
        const usuario = USUARIOS.find(u => u.name === username && u.password === password);

        if (!usuario) {
            showLoginError("Usuario o contraseña incorrectos");
            return;
        }

        window.location.href = `./user-info.html?id=${usuario.id}`;

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
        form.prepend(errorBox);
    }

    errorBox.textContent = message;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    inputs.forEach(validate);
    if (!form.checkValidity()) return;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    await loginUser(username, password);
});
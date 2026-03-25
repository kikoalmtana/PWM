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

    input.setCustomValidity(errorMsg);

    const small = document.querySelector(`[data-error-for="${input.id}"]`);
    if (small) {
        small.textContent = errorMsg;
    }
}

inputs.forEach(input => input.addEventListener('blur', () => {
    input.classList.add('touched');
    validate(input);
}, { once: true }));

form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputs.forEach(validate);

    if (!form.checkValidity()) {
        return;
    }

    console.log("Formulario válido");

});
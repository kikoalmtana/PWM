function initLineInfo() {
    document.querySelectorAll(".line-info-page h2").forEach(title => {
        title.addEventListener("click", () => {
            const grid = title.nextElementSibling;

            if (!grid.classList.contains("cards-grid")) return;

            if (grid.classList.contains("active")) {
                grid.style.height = grid.scrollHeight + "px";

                requestAnimationFrame(() => {
                    grid.style.height = "0px";
                });

                grid.classList.remove("active");
            } else {
                grid.classList.add("active");
                grid.style.height = grid.scrollHeight + "px";

                grid.addEventListener("transitionend", () => {
                    grid.style.height = "auto";
                }, { once: true });
            }
        });
    });

    document.querySelectorAll(".line-info-page h2").forEach(h2 => {
        h2.addEventListener("click", () => {
            h2.classList.toggle("active");
        });
    });
}

// Manejo del botón de ocultar/ver contraseña
function togglePassword(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<img src="../img/eye.svg" alt="mostrar contraseña"/>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<img src="../img/eye-off.svg" alt="mostrar contraseña"/>';
    }
}

const toggleBtn = document.getElementById('toggle-btn');
if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
        togglePassword('password', 'toggle-btn');
    });
}

const toggleBtnConfirm = document.getElementById('toggle-btn-confirm');
if (toggleBtnConfirm) {
    toggleBtnConfirm.addEventListener('click', function() {
        togglePassword('confirm-password', 'toggle-btn-confirm');
    });
}

// Funciones para el desplegable de selección de bono
function toggleOptions() {
    const options = document.getElementById("options");
    options.style.display = options.style.display === "block" ? "none" : "block";
}

function selectOption(element, tipo) {
    document.querySelector(".selected").textContent = element.textContent;
    document.getElementById("options").style.display = "none";

    const dniField = document.getElementById("dniField");

    if (tipo === "con_dni") {
        dniField.style.display = "inline-block";
        dniField.removeAttribute("disabled"); // ✅ lo activa
    } else {
        dniField.style.display = "none";
        dniField.setAttribute("disabled", "true"); // ✅ lo desactiva de la validación
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const options = document.getElementById("options");
    if (options) options.style.display = "none";

    const dniField = document.getElementById("dniField");
    if (dniField) dniField.setAttribute("disabled", "true");
});



// ─── SUBMIT DEL FORMULARIO ADD-PASS ──────────────────────────────────────────
const addPassForm = document.getElementById("addPassForm");

if (addPassForm) {
    addPassForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const codigoIntroducido = document.getElementById("codigoField").value.trim();
        const dniIntroducido    = document.getElementById("dniField").value.trim();
        const tipoSeleccionado  = document.querySelector(".selected").textContent.trim();


        // Validar DNI manualmente si está visible
        const esConDni = document.getElementById("dniField").style.display !== "none";
        if (esConDni && dniIntroducido === "") {
            alert("Por favor, introduce tu DNI.");
            return;
        }

        if (tipoSeleccionado === "Selecciona un bono") {
            alert("Por favor, selecciona un tipo de bono.");
            return;
        }


        let data;
        try {
            const res = await fetch("../json/bonos.json");
            data = await res.json();
        } catch (err) {
            alert("No se pudo cargar la base de datos de bonos.");
            return;
        }


        const bonoEncontrado = data.users.find(u => {
            console.log("comparando:", u.codigo_bono, "===", codigoIntroducido, "|", u.tipo_de_bono, "===", tipoSeleccionado);
            const coincideCodigo = u.codigo_bono === codigoIntroducido;
            const coincideTipo   = u.tipo_de_bono.toLowerCase() === tipoSeleccionado.toLowerCase();
            const coincideDni    = esConDni ? u.dni === dniIntroducido : true;
            return coincideCodigo && coincideTipo && coincideDni;
        });


        if (!bonoEncontrado) {
            alert("No se encontró ningún bono con esos datos. Revisa el código o el DNI.");
            return;
        }

        sessionStorage.setItem("bonoActivo", JSON.stringify(bonoEncontrado));
        window.location.href = "pass-info.html";
    });
}
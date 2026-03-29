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

function toggleOptions() {
    const options = document.getElementById("options");
    options.style.display = options.style.display === "block" ? "none" : "block";
}

const IMAGENES_BONO = {
    "Bono Guagua":            "../img/Bono_guagua.jpg",
    "Bono Residente Canario": "../img/Tarjeta_BonoResidente.jpg",
    "Tarjeta Guagua Joven":   "../img/Tarjeta_Wawa_Joven.png",
    "Tarjeta Bono Oro":       "../img/Tarjeta_bono_oro.jpg",
};

function selectOption(element, tipo) {
    document.querySelector(".selected").textContent = element.textContent;
    document.getElementById("options").style.display = "none";

    const dniField = document.getElementById("dniField");
    if (tipo === "con_dni") {
        dniField.style.display = "inline-block";
        dniField.removeAttribute("disabled");
    } else {
        dniField.style.display = "none";
        dniField.setAttribute("disabled", "true");
    }

    const bonoImagen = document.getElementById("bonoImagen");
    if (bonoImagen) {
        bonoImagen.src = IMAGENES_BONO[element.textContent.trim()] || "../img/Tarjeta_Wawa_Joven.png";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const options = document.getElementById("options");
    if (options) options.style.display = "none";

    const dniField = document.getElementById("dniField");
    if (dniField) dniField.setAttribute("disabled", "true");
});

const addPassForm = document.getElementById("addPassForm");

if (addPassForm) {
    addPassForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const codigoIntroducido = document.getElementById("codigoField").value.trim();
        const dniIntroducido    = document.getElementById("dniField").value.trim();
        const tipoSeleccionado  = document.querySelector(".selected").textContent.trim();

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
            const coincideCodigo = u.codigo_bono === codigoIntroducido;
            const coincideTipo   = u.tipo_de_bono.toLowerCase() === tipoSeleccionado.toLowerCase();
            const coincideDni    = esConDni ? u.dni === dniIntroducido : true;
            return coincideCodigo && coincideTipo && coincideDni;
        });

        if (!bonoEncontrado) {
            alert("No se encontró ningún bono con esos datos. Revisa el código o el DNI.");
            return;
        }

        const esAddPass = window.location.pathname.includes('add-pass');

        if (esAddPass) {
            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                alert("No hay sesión iniciada.");
                window.location.href = '../html/login.html';
                return;
            }

            try {
                const usuarioRes = await fetch(`http://localhost:3000/usuarios/${userId}`);
                const usuario = await usuarioRes.json();

                if (usuario.bonos.includes(bonoEncontrado.id)) {
                    alert("Este bono ya está añadido a tu cuenta.");
                    return;
                }

                const nuevosBonos = [...usuario.bonos, bonoEncontrado.id];

                await fetch(`http://localhost:3000/usuarios/${userId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bonos: nuevosBonos })
                });

                window.location.href = '../html/user-info.html';

            } catch (err) {
                alert("Error al guardar el bono. Inténtalo de nuevo.");
                console.error(err);
            }

        } else {
            sessionStorage.setItem("bonoActivo", JSON.stringify(bonoEncontrado));
            window.location.href = "pass-info.html";
        }
    });
}
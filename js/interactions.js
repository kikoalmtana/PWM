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

//Manejo del botón de ocultar/ver contraseña

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

document.getElementById('toggle-btn').addEventListener('click', function() {
    togglePassword('password', 'toggle-btn');
});

document.getElementById('toggle-btn-confirm').addEventListener('click', function() {
    togglePassword('confirm-password', 'toggle-btn-confirm');
});

//Manejo de elemento deslizable

function makeSwipeable(el, onSwipeLeft) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    el.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX - startX;

        // solo deslizar a la izquierda
        if (currentX < 0) {
            el.style.transform = `translateX(${currentX}px)`;
            el.style.opacity = 1 + (currentX / 200); // fade conforme desliza
        }
    }, { passive: true });

    el.addEventListener('touchend', () => {
        isDragging = false;

        if (currentX < -80) { // umbral para confirmar el swipe
            el.classList.add('removing');
            el.addEventListener('transitionend', () => {
                el.remove();
                onSwipeLeft?.();
            }, { once: true });
        } else {
            // volver a la posición original
            el.style.transform = '';
            el.style.opacity = '';
        }

        currentX = 0;
    });
}

// uso
document.querySelectorAll('.item').forEach(el => {
    makeSwipeable(el, () => {
        console.log('elemento eliminado');
    });
});
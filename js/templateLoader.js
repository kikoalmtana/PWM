async function init() {
    const elements = document.querySelectorAll('[data-template]');

    const promises = Array.from(elements).map(async (el) => {
        const name = el.getAttribute("data-template");
        const response = await fetch(`/templates/${name}.html`);
        el.innerHTML = await response.text();
    });

    await Promise.all(promises);

    // ── Después de cargar los templates, actualizar el header ──
    const userId = sessionStorage.getItem('userId');

    if (userId) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
            const usuario = await response.json();

            const loginBtn = document.querySelector('.login-button');
            if (loginBtn) {
                loginBtn.textContent = usuario.name;
                loginBtn.href = '../html/user-info.html';
            }

            const userNav = document.querySelector('.user-nav');
            if (userNav) {
                userNav.textContent = usuario.name;
                userNav.href = '../html/user-info.html';
            }
        } catch (error) {
            console.error('Error cargando usuario:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
const IMAGENES_BONO = {
    "Bono Guagua":            "../img/Bono_guagua.jpg",
    "Bono Residente Canario": "../img/Tarjeta_BonoResidente.jpg",
    "Tarjeta Guagua Joven":   "../img/Tarjeta_Wawa_Joven.png",
    "Tarjeta Bono Oro":       "../img/Tarjeta_bono_oro.jpg",
};

const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error:', error))
        .then(response => response.json());
}

async function init() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        window.location.href = '../html/login.html';
        return;
    }

    const usuario = await getData(`http://localhost:3000/usuarios/${userId}`);
    const todosLosBonos = await getData('../json/bonos.json');

    const bonosUsuario = todosLosBonos.users.filter(b => usuario.bonos.includes(b.id));

    document.querySelector('.user-info h3').textContent = usuario.name;

    const userPass = document.querySelector('.user-pass article[data-template="pass-info"]');
    userPass.removeAttribute('data-template');
    userPass.innerHTML = '';

    if (bonosUsuario.length === 0) {
        userPass.innerHTML = '<p>No tienes bonos añadidos.</p>';
    } else {
        bonosUsuario.forEach(bono => {
            const article = document.createElement('article');
            article.className = 'info-pass';
            article.innerHTML = `
                <div class="container-pass">
                    <img class="img-pass" src="${IMAGENES_BONO[bono.tipo_de_bono] || '../img/Tarjeta_Wawa_Joven.png'}" alt="Imagen del bono">
                    <div class="text">
                        <p><strong>${bono.tipo_de_bono}</strong></p>
                        <p>Viajes realizados: ${bono.viajes_realizados}</p>
                        <p>Fecha de caducidad: ${bono.fecha_caducidad}</p>
                        ${bono.saldo !== null ? `<p>Saldo: ${bono.saldo}€</p>` : ''}
                        ${bono.propietario_bono ? `<p>Titular: ${bono.propietario_bono}</p>` : ''}
                    </div>
                </div>
                <button class="button-pass"><img src="../img/x.svg" alt="X"></button>
            `;
            userPass.appendChild(article);
        });
    }
}

init();
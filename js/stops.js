const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

const paradas = await getData('http://localhost:3000/paradas');

const input = document.getElementById('input');
const guaguasBox = document.getElementById('guaguas-box');
document.querySelector('.stop-info').innerHTML = '';


const dropdown = document.createElement('ul');
dropdown.id = 'stops-dropdown';

const wrapper = document.querySelector('.stops form div');
wrapper.appendChild(dropdown);


const renderParada = (parada) => {
    guaguasBox.style.display = 'flex';

    const stopInfo = guaguasBox.querySelector('.stop-info');
    stopInfo.innerHTML = `<h3>${parada.nombre_parada} <span class="stop-id">#${parada.identificador_parada}</span></h3>`;

    parada.guaguas_en_camino.proxima_guagua.forEach(guagua => {
        const div = document.createElement('div');
        div.className = 'bus-from-stop';
        div.innerHTML = `
            <h4>${guagua.linea}</h4>
            <h5>${guagua.destino}</h5>
            <p>${guagua.llegada}</p>
        `;
        stopInfo.appendChild(div);
    });
};

const mostrarSugerencias = (query) => {
    dropdown.innerHTML = '';

    if (query === '') {
        dropdown.style.display = 'none';
        return;
    }

    const coincidencias = paradas.filter(p =>
        p.nombre_parada.toLowerCase().includes(query.toLowerCase()) ||
        p.identificador_parada.includes(query)
    );

    if (coincidencias.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    coincidencias.forEach(parada => {
        const li = document.createElement('li');
        li.textContent = `${parada.nombre_parada} (#${parada.identificador_parada})`;
        li.addEventListener('click', () => {
            input.value = parada.nombre_parada;
            dropdown.style.display = 'none';
            guaguasBox.style.display = 'none';
            renderParada(parada);
        });
        dropdown.appendChild(li);
    });

    dropdown.style.display = 'block';
};

input.addEventListener('input', () => mostrarSugerencias(input.value.trim()));

document.addEventListener('click', (e) => {
    if (!e.target.closest('form')) {
        dropdown.style.display = 'none';
    }
});
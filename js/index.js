// Función para obtener los datos de la API
const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

let noticias = await getData('http://localhost:3000/noticias');
noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

const noticiaMasReciente = noticias[0];

const img = document.getElementById('index-new-img');
const h3 = document.getElementById('index-new-title');
const p = document.getElementById('index-new-description');
const a = document.getElementById('index-new-anchor');


const cargarPrimeraNoticia = () => {

    img.src = noticiaMasReciente.imagen;
    h3.textContent = noticiaMasReciente.titulo;
    p.textContent = noticiaMasReciente.descripcion
    a.href = `./html/new.html?id=${noticiaMasReciente.id}`;
};

try {
    cargarPrimeraNoticia()
} catch (error) {
    console.error(error);
}
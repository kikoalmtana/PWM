// Función para obtener los datos de la API
const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

let noticias = await getData('http://localhost:3000/noticias');
noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

const noticiaMasReciente = noticias[0];
noticias.shift();

const primeraNoticia = document.getElementById('principal-new');
const noticiasSecundarias = document.getElementById('aditional-news-section');

const cargarPrimeraNoticia = (noticia) => {

    const img = document.createElement('img');
    img.src = noticia.imagen;
    img.className = 'principal';

    primeraNoticia.appendChild(img);

    const a = document.createElement('a');
    a.href = `../html/new.html?id=${noticia.id}`;

    const article = document.createElement('article');

    const titulo = document.createElement("h2");
    titulo.textContent = noticia.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = noticia.descripcion;

    article.appendChild(titulo);
    article.appendChild(descripcion);

    a.appendChild(article);

    primeraNoticia.appendChild(a);
};

const cargarNoticiasAdicionales = () => {

    const templates = document.getElementsByClassName('preview-noticia');

    console.log(templates);

    for (let contador = 0; contador < templates.length; contador++) {
        let template = templates[contador];

        const anchor = template.querySelector('a');
        anchor.href = `./new.html?id=${noticias[contador].id}`;

        const img = template.querySelector('img');
        img.src = noticias[contador].imagen;

        const titulo = template.querySelector('h3');
        titulo.textContent = noticias[contador].titulo;

        const descripcion = template.querySelector('p');
        descripcion.textContent = noticias[contador].descripcion;

        console.log("se supone que cambio")
    }
};

async function init() {
    const elements = document.querySelectorAll('[data-template]');

    const promises = Array.from(elements).map(async (el) => {
        const name = el.getAttribute("data-template");
        const response = await fetch(`/templates/${name}.html`);
        el.innerHTML = await response.text();
    });

    await Promise.all(promises);

    cargarPrimeraNoticia(noticiaMasReciente);
    cargarNoticiasAdicionales()
}

try {
    await init();
} catch (error) {
    console.log(error);
}
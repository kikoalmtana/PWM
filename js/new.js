// Función para obtener los datos de la API
const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

let noticias = await getData('http://localhost:3000/noticias');
noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

const params = new URLSearchParams(window.location.search);
const noticiaId = params.get('id');
const noticiaSeleccionada = noticias.find(noticia => String(noticia.id) === noticiaId);

noticias = noticias.filter(noticia => noticia.id !== noticiaId);

const cargarNoticiaSeleccionada = () => {

    const h1 = document.getElementById("new-title");
    h1.textContent = noticiaSeleccionada.titulo;

    const img = document.getElementById('new-img');
    img.src = noticiaSeleccionada.imagen;

    const content = document.getElementById('notice-content');
    const p = document.createElement('p');
    p.textContent = noticiaSeleccionada.contenido;

    content.appendChild(p);
}

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

    cargarNoticiaSeleccionada()
    cargarNoticiasAdicionales()
}

try {
    await init();
} catch (error) {
    console.log(error);
}
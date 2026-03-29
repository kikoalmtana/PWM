const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

const avisos = await getData('http://localhost:3000/avisos-de-linea');

console.log(avisos);
const seccionAvisos = document.getElementById("warning-section");

const lineas = await getData('http://localhost:3000/lineas');
lineas.sort((a, b) => { return a.numero - b.numero });

const listadoLineas = document.getElementById('listado-lineas');
const template = document.querySelectorAll('[data-template="lines-warnings"]');

// Función para cargar avisos de líneas
const cargarAvisosDeLinea = () => {
    avisos.forEach((aviso, id) => {
        const article = document.createElement("article");
        article.className = "lines-warning";

        const p = document.createElement("p");
        p.className = "warning";
        p.textContent = aviso.descripcion;

        article.appendChild(p);

        // Insertamos dentro del div correspondiente si existe
        if (template[id]) {
            template[id].appendChild(article);
        } else {
            // Si hay más datos que templates, añadimos al final de la sección
            seccionAvisos.appendChild(article);
        }
    })
};

const cargarLineas = () => {
  lineas.forEach((linea) => {
      const anchor = document.createElement("a");
      anchor.className = "line-selector";
      anchor.href = `../html/line-info.html?id=${linea.numero}`;
      console.log(linea.numero);
      console.log(linea);

      const div1 = document.createElement("div");
      div1.className = "line-number";
      div1.textContent = linea.numero;

      const div2 = document.createElement("div");
      div2.className = "line-name";
      div2.textContent = linea.primera_salida + " - " + linea.segunda_salida;

      const div3 = document.createElement("div");
      div3.className = "line-icon";

      anchor.appendChild(div1);
      anchor.appendChild(div2);
      anchor.appendChild(div3);

      listadoLineas.appendChild(anchor);
  })
};

try {
    cargarAvisosDeLinea();
    cargarLineas();
} catch (e) {
    console.error(e);
}

const searchInput = document.querySelector('form input');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const anchors = listadoLineas.querySelectorAll('.line-selector');

    anchors.forEach(anchor => {
        const numero = anchor.querySelector('.line-number').textContent.toLowerCase();
        const nombre = anchor.querySelector('.line-name').textContent.toLowerCase();

        if (numero.includes(query) || nombre.includes(query)) {
            anchor.style.display = "";
        } else {
            anchor.style.display = "none";
        }
    });
});
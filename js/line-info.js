// Función para obtener los datos de la API
const getData = async (link) => {
    return await fetch(link)
        .catch(error => console.error('Error fetching data:', error))
        .then(response => response.json());
}

const params = new URLSearchParams(window.location.search);
const lineaId = params.get('id');

const lineas = await getData('http://localhost:3000/lineas');
const linea = lineas.find(linea => String(linea.numero) === lineaId);
const encabezado = document.getElementById('header-linea')
const seccionHorarios = document.getElementById('seccion-horarios')
const seccionParadas = document.getElementById('seccion-lineas')

// Función para cargar el header de la línea
const cargarLinea = () => {

    const div1 = document.createElement("div");
    div1.className = "line-number";
    div1.textContent = lineaId;

    const div2 = document.createElement("div");
    div2.className = "line-name";
    div2.textContent = linea.primera_salida + " - " + linea.segunda_salida;

    const div3 = document.createElement("div");
    div3.className = "line-icon";

    encabezado.appendChild(div1);
    encabezado.appendChild(div2);
    encabezado.appendChild(div3);
};

// Función para cargar los horarios de la línea
const cargarHorarios = (sentido, salida) => {

    const column = document.createElement("div")
    column.className = "card-column";

    const desde = document.createElement("h3")
    desde.textContent = "Desde: " + String(salida)
    column.appendChild(desde);

    const horarios = linea.horarios.horarios.filter(h => h.sentido === String(sentido));

    horarios.forEach(h => {

        const card = document.createElement("div");
        card.className = "card";

        const horariosDia = document.createElement("p");
        horariosDia.className = "horarios-dia";
        horariosDia.textContent = h.tipo_dia;

        card.appendChild(horariosDia);

        const tablero = document.createElement("div");
        tablero.className = "horarios-chess";

        h.salidas.forEach(salida => {
            const s = document.createElement("p");
            s.textContent = salida;
            tablero.appendChild(s);
        })

        card.appendChild(tablero);

        column.appendChild(card);
    })

    seccionHorarios.appendChild(column);
};

const cargarParadas = (sentido, salida) => {

    const paradas = linea.paradas.paradas.filter(h => h.sentido === String(sentido));
    console.log(paradas)

    const column = document.createElement('div');
    column.className = "card-column";

    const header = document.createElement("h3");
    header.textContent = 'Desde: ' + String(salida)

    column.appendChild(header);

    paradas[0].lista_de_paradas.forEach(parada => {
        const p = document.createElement("p");
        p.textContent = parada;

        column.appendChild(p);
    })

    seccionParadas.appendChild(column);

};

// Llamada de funciones
try {
    cargarLinea();
    cargarHorarios('ida', linea.primera_salida);
    cargarHorarios('vuelta', linea.segunda_salida);
    cargarParadas('ida', linea.primera_salida);
    cargarParadas('vuelta', linea.segunda_salida);
} catch (e) {
    console.log(e);
}
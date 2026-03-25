// Declaración de variables

const input = document.getElementById("input");
const lista = document.createElement("li");
const boxArea = document.getElementById("guaguas-box");
const actualizar = document.getElementById("update-box");
const guardar = document.getElementById("save-stop");
const mapa = document.getElementById("go-map");

let paradas = []

async function cargarParadas() {
    try {
        const response = await fetch('http://localhost:3000/paradas');
        const data = await response.json();

        const paradas = data.map(item => ({
            identificador: item.identificador_parada,
            nombre: item.nombre_parada,
            proxima_guauga: item.proxima_guauga
        }));
    } catch (e) {
        console.error('Error al cargar paradas:', e);
    }
}
interface proximaGuagua {
  linea: number,
  destino: string,
  llegada: string
}

interface guaguasEnCamino {
  proximasGuaguas: proximaGuagua[]
}

export interface Parada {
  id?: string,
  idParada: string,
  nombreParada: string,
  siguientesGuaguas: guaguasEnCamino
}

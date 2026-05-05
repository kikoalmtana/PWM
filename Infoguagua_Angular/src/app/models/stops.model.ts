export interface ProximaGuagua {
  linea: number;
  destino: string;
  llegada: string;
}

export interface Stop {
  id?: string;
  identificador_parada: string;
  nombre_parada: string;
  guaguas_en_camino: {
    proxima_guagua: ProximaGuagua[];
  };
}

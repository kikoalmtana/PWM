// Tipos auxiliares
export type Sentido = "ida" | "vuelta";
export type TipoDia = "Lunes a viernes" | "Sábado, domingo y festivos" |
               "Sábados" | "Domingos y festívos";

interface Horario {
  sentido: Sentido;
  tipo_dia: TipoDia;
  salidas: string[];
}

interface Horarios {
  horarios: Horario[];
}

interface ParadasPorSentido {
  sentido: Sentido;
  lista_de_paradas: string[];
}

interface Paradas {
  paradas: ParadasPorSentido[];
}

export interface Linea {
  id?: string;
  numero: number;
  primera_salida: string;
  segunda_salida: string;
  horarios: Horarios;
  paradas: Paradas;
}

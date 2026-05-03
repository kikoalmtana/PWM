type Bono = "Bono Residente Canario" | "Tarjeta Guagua Joven" |
  "Tarjeta Bono Oro" | "Bono Guagua" | "";

export interface Pass {
  id?: string,
  tipoBono: Bono,
  viajesRealizados: number,
  idUsuario?: string,
  caducidad: string,
  saldo: string | "N/A",
  codigo: string,
  dni: string
}

import { Component } from '@angular/core';
import { Heading } from '../../components/heading/heading';
import { StopInformationArea } from '../../components/stop-information-area/stop-information-area';

@Component({
  selector: 'app-stops',
  standalone: true,
  imports: [Heading, StopInformationArea],
  templateUrl: './stops.html',
  styleUrl: './stops.css',
})
export class Stops {

  paradas = [
    {
      nombre: 'Juan Manuel Durán González (El Corte Inglés)',
      buses: [
        { numero: '2',  destino: 'Guiniguada', tiempo: '4 min.' },
        { numero: '2',  destino: 'Guiniguada', tiempo: '16 min.' },
        { numero: '26', destino: 'Campus',     tiempo: '20 min.' },
      ]
    },
    {
      nombre: 'Alfredo L. Jones, 1',
      buses: [
        { numero: '2', destino: 'Puerto', tiempo: '2 min.' },
        { numero: '1', destino: 'Puerto', tiempo: '6 min.' },
        { numero: '2', destino: 'Puerto', tiempo: '13 min.' },
        { numero: '1', destino: 'Puerto', tiempo: '19 min.' },
        { numero: '2', destino: 'Puerto', tiempo: '21 min.' },
      ]
    },
    {
      nombre: 'Rafael Cabrera (San Telmo)',
      buses: [
        { numero: '17', destino: 'Auditorio', tiempo: '2 min.' },
        { numero: '12', destino: 'Puerto',    tiempo: '8 min.' },
        { numero: '12', destino: 'Puerto',    tiempo: '13 min.' },
        { numero: '1',  destino: 'Puerto',    tiempo: '17 min.' },
      ]
    },
    {
      nombre: 'Mesa y López (Madera y Corcho)',
      buses: [
        { numero: '17', destino: 'Auditorio', tiempo: '4 min.' },
        { numero: '26', destino: 'Campus',    tiempo: '6 min.' },
        { numero: '26', destino: 'Campus',    tiempo: '27 min.' },
      ]
    },
  ];
}

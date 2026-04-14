import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bus-arrival',
  standalone: true,
  imports: [],
  templateUrl: './bus-arrival.html',
  styleUrl: './bus-arrival.css',
})

export class BusArrival {
  @Input() numero: string = '';
  @Input() destino: string = '';
  @Input() tiempo: string = '';
}

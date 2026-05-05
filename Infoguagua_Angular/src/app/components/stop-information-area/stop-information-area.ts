import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { BusArrival } from '../bus-arrival/bus-arrival';

@Component({
  selector: 'app-stop-information-area',
  standalone: true,
  imports: [NgFor, BusArrival],
  templateUrl: './stop-information-area.html',
  styleUrl: './stop-information-area.css',
})
export class StopInformationArea {
  @Input() nombreParada: string = '';
  @Input() buses: { numero: string, destino: string, tiempo: string }[] = [];
}

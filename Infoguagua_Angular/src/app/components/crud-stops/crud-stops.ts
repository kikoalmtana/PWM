import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { StopsService } from '../../services/stops';
import { Stop, ProximaGuagua } from '../../models/stops.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-crud-stops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-stops.html',
  styleUrl: './crud-stops.css',
})
export class StopComponent {
  private stopsService = inject(StopsService);

  stops = toSignal(this.stopsService.getStops(), { initialValue: [] });
  stop = signal<Stop>(this.emptyStop());

  stopData: Stop = this.emptyStop();

  async saveStop() {
    try {
      await this.stopsService.addStop(this.stopData);
      this.resetForm();
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }

  agregarGuagua() {
    this.stopData.guaguas_en_camino.proxima_guagua.push({
      linea: 0,
      destino: '',
      llegada: ''
    });
  }

  eliminarGuagua(index: number) {
    this.stopData.guaguas_en_camino.proxima_guagua.splice(index, 1);
  }

  resetForm() {
    this.stopData = this.emptyStop();
    this.stop.set(this.emptyStop());
  }

  private emptyStop(): Stop {
    return {
      identificador_parada: '',
      nombre_parada: '',
      guaguas_en_camino: { proxima_guagua: [] }
    };
  }
}

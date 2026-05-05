import { Component, inject } from '@angular/core';
import { Heading } from '../../components/heading/heading';
import { StopInformationArea } from '../../components/stop-information-area/stop-information-area';
import { StopsService } from '../../services/stops';
import { Stop } from '../../models/stops.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stops',
  standalone: true,
  imports: [Heading, StopInformationArea, CommonModule, FormsModule],
  templateUrl: './stops.html',
  styleUrl: './stops.css',
})
export class Stops {
  private stopsService = inject(StopsService);

  paradas = toSignal(this.stopsService.getStops(), { initialValue: [] as Stop[] });

  searchTerm = '';

  get paradasFiltradas(): Stop[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.paradas();
    return this.paradas().filter(p =>
      p.nombre_parada.toLowerCase().includes(term) ||
      p.identificador_parada.toLowerCase().includes(term)
    );
  }

  getBuses(parada: Stop): { numero: string; destino: string; tiempo: string }[] {
    return (parada.guaguas_en_camino?.proxima_guagua ?? []).map(g => ({
      numero: g.linea.toString(),
      destino: g.destino,
      tiempo: g.llegada,
    }));
  }
}

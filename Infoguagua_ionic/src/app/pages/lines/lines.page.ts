import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinesService } from '../../services/lines';
import { Linea } from '../../models/lines.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-lines',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './lines.page.html',
  styleUrl: './lines.page.scss',
})
export class LinesPage {
  private linesService = inject(LinesService);

  lineas = toSignal(this.linesService.getLineas(), { initialValue: [] as Linea[] });

  searchTerm = '';

  get lineasFiltradas(): Linea[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.lineas();
    return this.lineas().filter(l =>
      l.numero.toString().includes(term) ||
      l.primera_salida.toLowerCase().includes(term) ||
      l.segunda_salida.toLowerCase().includes(term)
    );
  }
}

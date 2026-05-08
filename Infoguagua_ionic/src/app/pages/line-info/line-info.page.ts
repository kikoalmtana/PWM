import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map, filter } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Linea } from '../../models/lines.model';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-line-info',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './line-info.page.html',
  styleUrl: './line-info.page.scss',
})
export class LineInfoPage {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  seccionAbierta = signal<string | null>(null);

  linea = toSignal<Linea | null>(
    this.route.queryParams.pipe(
      map(params => params['id'] as string),
      filter(id => !!id),
      switchMap(id => {
        const ref = doc(this.firestore, 'lineas', id);
        return docData(ref).pipe(
          map(data => ({ ...data, id } as Linea))
        );
      })
    ),
    { initialValue: null }
  );

  toggle(seccion: string) {
    this.seccionAbierta.set(this.seccionAbierta() === seccion ? null : seccion);
  }

  isOpen(seccion: string): boolean {
    return this.seccionAbierta() === seccion;
  }
}

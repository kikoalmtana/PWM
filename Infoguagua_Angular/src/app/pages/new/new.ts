import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, doc, docData, collection, collectionData } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map, filter, Observable } from 'rxjs';
import { New } from '../../models/new.model';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class NewDetail {
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  noticia = toSignal<New | null>(
    this.route.queryParams.pipe(
      map(params => params['id'] as string),
      filter(id => !!id),
      switchMap(id => {
        const ref = doc(this.firestore, 'new', id);
        return (docData(ref) as Observable<New>).pipe(
          map(data => ({ ...data, id }))
        );
      })
    ),
    { initialValue: null }
  );

  otrasNoticias = toSignal<New[], New[]>(
    this.route.queryParams.pipe(
      map(params => params['id'] as string),
      switchMap(idActual => {
        const ref = collection(this.firestore, 'new');
        return (collectionData(ref, { idField: 'id' }) as Observable<New[]>).pipe(
          map(todas => todas.filter(n => n.id !== idActual).slice(0, 2))
        );
      })
    ),
    { initialValue: [] as New[] }
  );
}

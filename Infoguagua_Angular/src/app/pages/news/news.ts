import { Component, inject } from '@angular/core';
import { PreviewNew } from '../../components/preview-new/preview-new';
import { Heading } from '../../components/heading/heading';
import { PrincipalNew } from '../../components/principal-new/principal-new';
import { NewService } from '../../services/news';
import { New } from '../../models/new.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [PreviewNew, Heading, PrincipalNew, CommonModule, RouterLink],  // añade RouterLink aquí
  templateUrl: './news.html',
  styleUrl: './news.css',
})

export class News {
  private newsService = inject(NewService);

  noticias = toSignal(this.newsService.getNews(), { initialValue: [] as New[] });

  get noticiaPrincipal(): New | null {
    const all = this.noticias();
    return all.length > 0 ? all[0] : null;
  }

  get noticiasSecundarias(): New[] {
    return this.noticias().slice(1);
  }
}

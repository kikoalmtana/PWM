import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NewService } from '../../services/news';
import { New } from '../../models/new.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-crud-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-news.html',
  styleUrl: './crud-news.css',
})
export class NewComponent {
  private newsService = inject(NewService);

  public news = toSignal(this.newsService.getNews(), { initialValue: [] });
  public isEditing = signal(false);

  public newData: New = this.emptyNew();

  async onSubmit(form: NgForm) {
    if (form.invalid) return;
    try {
      if (this.isEditing()) {
        await this.newsService.updateNew(this.newData);
      } else {
        await this.newsService.addNews(this.newData);
      }
      this.cancelEdit(form);
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  }

  cancelEdit(form: NgForm) {
    form.resetForm();
    this.newData = this.emptyNew();
    this.isEditing.set(false);
  }

  private emptyNew(): New {
    return {
      title: '',
      description: '',
      content: '',
      author: '',
      date: '',
      image: ''
    };
  }
}

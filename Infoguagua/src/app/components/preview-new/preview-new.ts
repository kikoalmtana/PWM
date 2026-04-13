import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-preview-new',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './preview-new.html',
  styleUrl: './preview-new.css',
})

export class PreviewNew {
  @Input() encabezado!: string;
  @Input() descripcion!: string;
  @Input() link!: string;
  @Input() portada!: string;
}

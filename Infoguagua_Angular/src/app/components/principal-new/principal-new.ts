import {Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal-new',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './principal-new.html',
  styleUrl: './principal-new.css',
})
export class PrincipalNew {
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() link!: string;
  @Input() portada!: string;
}

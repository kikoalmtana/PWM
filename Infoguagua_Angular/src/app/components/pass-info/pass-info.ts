import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pass } from '../../models/pass.model';

@Component({
  selector: 'app-pass-info',
  imports: [],
  templateUrl: './pass-info.html',
  styleUrl: './pass-info.css',
  standalone: true
})
export class PassInfoComponent {
  @Input() pass!: Pass;
  @Output() eliminar = new EventEmitter<string>();

  onEliminar() {
    if (this.pass.id) {
      this.eliminar.emit(this.pass.id);
    }
  }
}

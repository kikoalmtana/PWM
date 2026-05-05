import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PassService } from '../../services/pass';
import { Pass } from '../../models/pass.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-crud-pass',
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-pass.html',
  styleUrl: './crud-pass.css',
})
export class PassComponent {
  private passService = inject(PassService);

  passVacio: Pass = {
    tipoBono: '',
    viajesRealizados: 0,
    idUsuario: '',
    caducidad: '',
    saldo: 'N/A',
    codigo: '',
    dni: ''
  };

  pass: Pass = { ...this.passVacio };

  passes = toSignal(this.passService.getPasses(), { initialValue: [] as Pass[] });

  onSubmit(passForm: NgForm) {
    if (!passForm.valid) return;

    if (this.pass.id) {
      this.passService.updatePass(this.pass).then(() => {
        passForm.resetForm();
        this.pass = { ...this.passVacio };
      });
    } else {
      this.passService.addPass(this.pass).then(() => {
        passForm.resetForm();
        this.pass = { ...this.passVacio };
      });
    }
  }

  onDelete(id: string) {
    if (confirm('¿Seguro que quieres eliminar este bono?')) {
      this.passService.deletePass(id);
    }
  }

  onSelect(pass: Pass) {
    this.pass = { ...pass };
  }
}

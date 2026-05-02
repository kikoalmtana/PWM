import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
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
export class CRUDPass {
  private passService = inject(PassService);

  pass: Pass = {
    tipoBono: "",
    viajesRealizados: 0,
    idUsuario: "",
    caducidad: "",
    saldo: "N/A",
    codigo: "",
    dni: ""
}

  books = toSignal(this.passService.getPasses(), { initialValue: [] });

  onSubmit(passForm: NgForm) {
    if (passForm.valid) {
      if (this.pass.id) {
        this.passService.updatePass(this.pass)
          .then(() => {
            passForm.resetForm();
            this.pass = {
              tipoBono: "",
              viajesRealizados: 0,
              idUsuario: "",
              caducidad: "",
              saldo: "N/A",
              codigo: "",
              dni: ""
            }
          });
      } else {
        this.passService.addPass(this.pass)
          .then(() => {
            passForm.resetForm();
            this.pass = {
              tipoBono: "",
              viajesRealizados: 0,
              idUsuario: "",
              caducidad: "",
              saldo: "N/A",
              codigo: "",
              dni: ""
            }
          });
      }
    }
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this pass?')) {
      this.passService.deletePass(id);
    }
  }

  onSelect(pass: Pass) {
    this.pass = { ...pass };
  }
}

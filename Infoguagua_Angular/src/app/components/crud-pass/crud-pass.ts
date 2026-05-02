import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PassService } from '../../services/pass';
import { UserService } from '../../services/user';
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
  private userService = inject(UserService);

  pass: Pass = {
    tipoBono: "",
    viajesRealizados: 0,
    idUsuario: "",
    caducidad: "",
    saldo: "N/A",
    codigo: "",
    dni: ""
}

  passes = toSignal(this.passService.getPasses(), { initialValue: [] });
  users = toSignal(this.userService.getUsers(), { initialValue: [] });


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

  getUserEmail(id: string): string {
    const user = this.users().find(u => u.uid === id);
    return user ? user.email : 'Cargando usuario...';
  }
}

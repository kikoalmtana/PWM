import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PassService } from '../../services/pass';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

type Bono = 'Bono Guagua' | 'Bono Residente Canario' | 'Tarjeta Guagua Joven' | 'Tarjeta Bono Oro';

const BONOS_SIN_DNI: Bono[] = ['Bono Guagua'];
const BONOS_CON_DNI: Bono[] = ['Bono Residente Canario', 'Tarjeta Guagua Joven', 'Tarjeta Bono Oro'];

@Component({
  selector: 'app-add-pass',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-pass.html',
  styleUrl: './add-pass.css',
})
export class AddPass {
  private fb = inject(FormBuilder);
  private passService = inject(PassService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  bonos: Bono[] = [...BONOS_SIN_DNI, ...BONOS_CON_DNI];
  dropdownAbierto = false;
  bonoSeleccionado: Bono | null = null;
  requiereDni = false;
  cargando = false;
  error = '';

  form = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
    dni: [''],
  });

  toggleDropdown() {
    this.dropdownAbierto = !this.dropdownAbierto;
  }

  seleccionarBono(bono: Bono) {
    this.bonoSeleccionado = bono;
    this.dropdownAbierto = false;
    this.requiereDni = BONOS_CON_DNI.includes(bono);

    if (this.requiereDni) {
      this.form.get('dni')!.setValidators([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('^[0-9]{8}[A-Za-z]$')
      ]);
    } else {
      this.form.get('dni')!.clearValidators();
      this.form.get('dni')!.setValue('');
    }
    this.form.get('dni')!.updateValueAndValidity();
  }

  async onSubmit() {
    this.error = '';

    if (!this.bonoSeleccionado) {
      this.error = 'Selecciona un tipo de bono.';
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;

    const user = await firstValueFrom(this.authService.currentUser$);
    if (!user) {
      this.error = 'Debes estar logado para añadir un bono.';
      this.cargando = false;
      return;
    }

    const bono = await this.passService.findByCodigo(
      this.form.value.codigo!,
      this.bonoSeleccionado
    );

    if (!bono) {
      this.error = 'No se encontró ningún bono con ese código y tipo.';
      this.cargando = false;
      return;
    }

    await this.userService.addBonoToUser(user.uid, bono.id!);
    this.router.navigate(['/user-info']);
  }
}

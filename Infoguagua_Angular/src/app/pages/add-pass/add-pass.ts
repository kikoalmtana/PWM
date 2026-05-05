import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PassService } from '../../services/pass';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

function dniValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  if (!value) return null;

  const dniRegex = /^[0-9]{8}[A-Za-z]$/;
  if (!dniRegex.test(value)) {
    return { dniInvalid: 'El DNI debe tener 8 números y una letra' };
  }

  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const numero = parseInt(value.substring(0, 8), 10);
  const letraEsperada = letras[numero % 23];
  const letraIntroducida = value.charAt(8).toUpperCase();

  if (letraIntroducida !== letraEsperada) {
    return { dniInvalid: 'La letra del DNI no es correcta' };
  }

  return null;
}

@Component({
  selector: 'app-add-pass',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-pass.html',
  styleUrls: ['./add-pass.css']
})

export class AddPass implements OnInit {
  private passService = inject(PassService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  form!: FormGroup;
  isDropdownOpen = false;
  cargando = false;
  error = '';

  bonos = [
    { label: 'Bono Guagua',            value: 'basico',  requiresDni: false },
    { label: 'Bono Residente Canario', value: 'con_dni', requiresDni: true  },
    { label: 'Tarjeta Guagua Joven',   value: 'con_dni_joven', requiresDni: true  },
    { label: 'Tarjeta Bono Oro',       value: 'con_dni_oro',   requiresDni: true  },
  ];

  selectedBono: typeof this.bonos[0] | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      bono:   [null, Validators.required],
      codigo: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]*$/)
      ]],
      dni: ['']
    });
  }

  get bono()   { return this.form.get('bono')!;   }
  get codigo() { return this.form.get('codigo')!; }
  get dni()    { return this.form.get('dni')!;    }

  get requiresDni(): boolean {
    return this.selectedBono?.requiresDni ?? false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectBono(bono: typeof this.bonos[0]): void {


    this.selectedBono = bono;
    this.bono.setValue(bono.value);
    this.isDropdownOpen = false;

    if (bono.requiresDni) {
      this.dni.setValidators([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        dniValidator
      ]);
    } else {
      this.dni.clearValidators();
      this.dni.setValue('');
    }
    this.dni.updateValueAndValidity();
  }

  getCodigoError(): string {
    if (this.codigo.hasError('required'))   return 'El código es obligatorio';
    if (this.codigo.hasError('minlength') ||
      this.codigo.hasError('maxlength'))  return 'Debe tener 6 caracteres';
    if (this.codigo.hasError('pattern'))    return 'Debe ser un código numérico';
    return '';
  }

  getDniError(): string {
    if (this.dni.hasError('required'))   return 'El DNI es obligatorio para este bono';
    if (this.dni.hasError('minlength') ||
      this.dni.hasError('maxlength'))  return 'Debe tener 9 caracteres';
    if (this.dni.hasError('dniInvalid')) return this.dni.errors!['dniInvalid'];
    return '';
  }

  async onSubmit() {
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
      this.selectedBono?.label ?? ""
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

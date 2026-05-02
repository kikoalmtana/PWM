import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { PopupComponent } from '../../components/popup-form/popup-form';
import { Aside } from '../../components/aside/aside';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PopupComponent, Aside, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  togglePassword(){ this.showPassword = !this.showPassword; }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(
        this.email?.value,
        this.password?.value
      );
      this.router.navigate(['/user-info']);
    } catch (e: any) {
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/invalid-credential': 'Credenciales incorrectas',
    };
    return messages[code] ?? 'Error al iniciar sesión';
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}

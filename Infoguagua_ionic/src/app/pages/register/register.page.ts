import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterPage {
  showPassword = false;
  showPasswordConfirm = false;
  errorMessage = '';
  isLoading = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[A-Za-z]).+$')
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  togglePasswordConfirm() { this.showPasswordConfirm = !this.showPasswordConfirm; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.authService.register(
        this.email?.value,
        this.password?.value,
        this.username?.value
      );
      this.router.navigate(['/favorites']);
    } catch (e: any) {
      console.error('Error code:', e.code);
      console.error('Error message:', e.message);
      this.errorMessage = this.getErrorMessage(e.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(code: string): string {
    const messages: Record<string, string> = {
      'auth/email-already-in-use': 'Este email ya está registrado',
      'auth/invalid-email': 'Email inválido',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/network-request-failed': 'Error de red, inténtalo de nuevo',
    };
    return messages[code] ?? 'Error al registrarse';
  }

  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}

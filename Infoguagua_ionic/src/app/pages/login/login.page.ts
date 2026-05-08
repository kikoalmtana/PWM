import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PopupComponent } from 'src/app/components/popup-form/popup-form';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, PopupComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  @ViewChild(PopupComponent) popup!: PopupComponent;
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

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found': return 'Usuario no encontrado';
      case 'auth/wrong-password': return 'Contraseña incorrecta';
      case 'auth/invalid-email': return 'Email inválido';
      default: return 'Error de autenticación';
    }
  }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup} from '@angular/forms';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if(password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  showPassword = false;
  showPasswordConfirm = false;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
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
    }, { validators: passwordMatchValidator });
  }



  togglePassword(){ this.showPassword = !this.showPassword; }
  togglePasswordConfirm(){ this.showPasswordConfirm = !this.showPasswordConfirm; }

  onSubmit() {
    if(this.form.valid) {
      console.log("Formulario valido");
    }
  }

  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}

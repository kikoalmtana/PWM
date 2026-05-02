import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopupComponent } from '../../components/popup-form/popup-form';
import { Aside } from '../../components/aside/aside';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PopupComponent, Aside, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
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

  onSubmit() {
    if(this.form.valid) {
      console.log("Formulario valido");
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}

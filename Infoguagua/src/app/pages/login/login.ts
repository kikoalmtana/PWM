import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopupComponent } from '../../components/popup-form/popup-form';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PopupComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;

  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [
        Validators.required
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

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
}

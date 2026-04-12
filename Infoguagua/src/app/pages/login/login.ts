import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {form} from '@angular/forms/signals';
import { PopupComponent } from '../../components/popup-form/popup-form';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PopupComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly form = form;

  log() {
    console.log('click recibido');
  }
}

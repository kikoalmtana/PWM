import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PassInfoComponent } from '../../components/pass-info/pass-info';
import {PopupConfirm} from '../../components/popup-confirm/popup-confirm';

@Component({
  selector: 'app-user-info',
  imports: [RouterLink, PassInfoComponent, PopupConfirm],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {}

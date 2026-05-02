import { Component } from '@angular/core';
import { Heading } from '../../components/heading/heading'
import { LinesComponent } from  '../../components/curd-lines/curd-lines';

@Component({
  selector: 'app-administrator-page',
  standalone: true,
  imports: [Heading, LinesComponent],
  templateUrl: './administrator-page.html',
  styleUrl: './administrator-page.css',
})
export class AdministratorPage {

}

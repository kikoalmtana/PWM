import { Component } from '@angular/core';
import { Heading } from '../../components/heading/heading'
import { LinesComponent } from  '../../components/curd-lines/curd-lines';
import { PassComponent } from  '../../components/crud-pass/crud-pass';

@Component({
  selector: 'app-administrator-page',
  standalone: true,
  imports: [Heading, LinesComponent, PassComponent],
  templateUrl: './administrator-page.html',
  styleUrl: './administrator-page.css',
})
export class AdministratorPage {

}

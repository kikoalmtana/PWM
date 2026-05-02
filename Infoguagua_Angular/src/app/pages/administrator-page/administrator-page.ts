import { Component } from '@angular/core';
import { Heading } from '../../components/heading/heading'
import { LinesComponent } from  '../../components/curd-lines/curd-lines';
import { PassComponent } from  '../../components/crud-pass/crud-pass';
import { StopComponent } from '../../components/crud-stops/crud-stops'
import { NewComponent } from '../../components/crud-news/crud-news'

@Component({
  selector: 'app-administrator-page',
  standalone: true,
  imports: [Heading, LinesComponent, PassComponent, StopComponent, NewComponent],
  templateUrl: './administrator-page.html',
  styleUrl: './administrator-page.css',
})
export class AdministratorPage {

}

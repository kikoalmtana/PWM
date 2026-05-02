import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinesWarnings} from '../../components/lines-warnings/lines-warnings';

@Component({
  selector: 'app-lines',
  imports: [RouterLink, LinesWarnings],
  templateUrl: './lines.html',
  styleUrl: './lines.css',
})
export class Lines {}

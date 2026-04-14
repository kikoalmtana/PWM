import { Component, Input } from '@angular/core';
import { Heading } from '../../components/heading/heading';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [Heading],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {}

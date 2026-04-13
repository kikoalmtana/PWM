import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { PassInfoComponent } from './components/pass-info/pass-info';
import {FooterComponent} from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, PassInfoComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  showHeader = true;
  showFooter = true;

  private noLayoutRoutes = ['/login', '/register'];

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hide = this.noLayoutRoutes.includes(event.url);
        this.showHeader = !hide;
        this.showFooter = !hide;
      }
    });
  }
}

import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {ButtonComponentComponent} from '../core/components/button-component/button-component.component';
import {routes} from '../app.routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    ButtonComponentComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    isLogged: boolean = false;

  protected readonly routes = routes;

  constructor(private router: Router) {}

  navigateToCatalog() {
      this.router.navigate(['/catalog']);
  }

  navigateToCollection() {
    this.router.navigate(['/collection']);
  }
}

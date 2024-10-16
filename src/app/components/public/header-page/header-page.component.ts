import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss',
})
export class HeaderPageComponent {
  activeUrl: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeUrl = this.router.url;
        console.log(this.activeUrl);
      });
  }

  isActive = false; // Estado inicial do menu

  toggleMenu() {
    this.isActive = !this.isActive; // Alterna o estado do menu
  }
}

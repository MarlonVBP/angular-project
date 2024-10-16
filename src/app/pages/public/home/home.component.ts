import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from "../../../components/public/footer/footer.component";
import { HeaderPageComponent } from "../../../components/public/header-page/header-page.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderPageComponent],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }), // Começa invisível e levemente deslocado para baixo
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ), // Anima para ficar visível e retornar à posição original
      ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CategoryGraficComponent } from '../../../components/public/category-grafic/category-grafic.component';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [FooterComponent, HeaderPageComponent, CategoryGraficComponent],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.scss'],
})
export class SobreNosComponent {}

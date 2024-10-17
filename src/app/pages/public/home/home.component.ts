import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import { CardsReceitasComponent } from '../../../components/public/cards-receitas/cards-receitas.component';
import { CommonModule } from '@angular/common';
import { Receita } from '../../../models/receita';
import { ReceitasService } from '../../../services/receitas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderPageComponent,
    CardsReceitasComponent,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '0.5s ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  receitas: Receita[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  loadingrecipes: boolean = false;

  constructor(private receitaService: ReceitasService) {
    this.load(this.currentPage);
  }

  load(page: number): void {
    this.loadingrecipes = true;
    this.receitaService
      .getRandomRecipes(this.pageSize)
      .subscribe((responses: any[]) => {
        const newReceitas = responses.map((response) => response.meals[0]);
        this.receitas = [...this.receitas, ...newReceitas];
        console.log(this.receitas);
        this.loadingrecipes = false;
      });
  }

  nextPage(): void {
    this.currentPage++;
    this.load(this.currentPage);
  }
}

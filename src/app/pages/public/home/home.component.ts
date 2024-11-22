import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from '../../../components/public/footer/footer.component';
import { HeaderPageComponent } from '../../../components/public/header-page/header-page.component';
import { CardsReceitasComponent } from '../../../components/public/cards-receitas/cards-receitas.component';
import { CommonModule } from '@angular/common';
import { Receita } from '../../../models/receita';
import { ReceitasService } from '../../../services/receitas.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalReceitasComponent } from '../../../components/modal-receitas/modal-receitas.component';
import { FabButtonComponent } from '../../../components/public/fab-button/fab-button.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderPageComponent,
    CardsReceitasComponent,
    CommonModule,
    MatProgressSpinnerModule,
    ModalReceitasComponent,
    FabButtonComponent,
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
export class HomeComponent implements OnInit {
  receitas: Receita[] = [];
  currentPage: number = 1;
  pageSize: number = 9;
  loadingrecipes: boolean = false;
  maxRecipes: number = 50;
  updateSubscription!: Subscription;

  constructor(private receitaService: ReceitasService) {
    this.load(this.currentPage);
  }

  ngOnInit(): void {
    this.updateSubscription = this.receitaService
      .getRecipesWithUpdates(10000)
      .subscribe((recipes) => {
        if (this.receitas.length >= this.maxRecipes) {
          this.updateSubscription.unsubscribe(); // Para de buscar novas receitas
        } else {
          const newReceitas = recipes.map((response) => response.meals[0]);
          this.receitas = [...this.receitas, ...newReceitas];
        }
      });
  }

  load(page: number): void {
    this.loadingrecipes = true;
    this.receitaService
      .getRandomRecipes(this.pageSize)
      .subscribe((responses: any[]) => {
        const newReceitas = responses.map((response) => response.meals[0]);
        this.receitas = [...this.receitas, ...newReceitas];
        this.loadingrecipes = false;
      });
  }

  nextPage(): void {
    if (this.receitas.length >= this.maxRecipes) {
      this.receitas = [];
      this.currentPage = 1;
      this.load(this.currentPage);
    } else {
      this.currentPage++;
      this.load(this.currentPage);
    }
  }

  selectedRecipe: Receita[] = [];
  isModalOpen: boolean = false;

  showInput(recipe: any) {
    this.selectedRecipe = recipe;
    this.isModalOpen = true;
  }

  handleModalClose(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}

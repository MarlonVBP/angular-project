import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FooterComponent } from "../../../components/public/footer/footer.component";
import { HeaderPageComponent } from "../../../components/public/header-page/header-page.component";
import { CardsReceitasComponent } from "../../../components/public/cards-receitas/cards-receitas.component";
import { CommonModule } from '@angular/common';
import { Receita } from '../../../models/receita';
import { ReceitasService } from '../../../services/receitas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderPageComponent, CardsReceitasComponent, CommonModule],
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
export class HomeComponent {
  constructor(private receitaService: ReceitasService){
    this.load();
  }

  load(){
    this.receitaService.select().subscribe((response: any)=>{
      // this.receitas = response;
      console.log(response)
    })
  }

  receitas: Receita[] = [];
}

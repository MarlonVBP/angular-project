import { Component, Input, input } from '@angular/core';
import { Receita } from '../../../models/receita';

@Component({
  selector: 'app-cards-receitas',
  standalone: true,
  imports: [],
  templateUrl: './cards-receitas.component.html',
  styleUrl: './cards-receitas.component.scss',
})
export class CardsReceitasComponent {
  @Input() receita!: Receita;

  constructor() {}
}

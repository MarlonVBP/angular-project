import { Component, Input, input } from '@angular/core';
import { Receita } from '../../../models/receita';
import { TextEllipsisPipe } from '../../../pipes/text-ellipsis.pipe';

@Component({
  selector: 'app-cards-receitas',
  standalone: true,
  imports: [TextEllipsisPipe],
  templateUrl: './cards-receitas.component.html',
  styleUrl: './cards-receitas.component.scss',
})
export class CardsReceitasComponent {
  @Input() receita!: Receita;

  constructor() {}
}

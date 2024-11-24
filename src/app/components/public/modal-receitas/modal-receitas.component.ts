import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-receitas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-receitas.component.html',
  styleUrl: './modal-receitas.component.scss',
})
export class ModalReceitasComponent {
  @Input() recipeData: any;
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  getIngredients(): string[] {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.recipeData[`strIngredient${i}`];
      const measure = this.recipeData[`strMeasure${i}`];
      if (ingredient && ingredient !== '') {
        ingredients.push(`${measure ? measure : ''} ${ingredient}`);
      }
    }
    return ingredients;
  }
  closeModal() {
    this.closeModalEvent.emit(false);
  }
}

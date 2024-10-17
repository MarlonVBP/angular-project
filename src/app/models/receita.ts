import { IngredientesBase } from './ingredientes-base';

export interface Receita {
  id: number;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea: string;
  created_at: string;
  ingredientesBase: IngredientesBase[];
}

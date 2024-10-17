import { IngredientesBase } from "./ingredientes-base";

export interface Receita {
  id: number;
  receita: string;
  ingredientes: string;
  modo_preparo: string;
  link_imagem: string;
  tipo: string;
  created_at: string;
  ingredientesBase: IngredientesBase[]
}

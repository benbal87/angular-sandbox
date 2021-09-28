import IngredientModel from '../../shopping-list/ingredient.model'
import { EventEmitter } from '@angular/core'

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Array<IngredientModel>>()

  private ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ]

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}

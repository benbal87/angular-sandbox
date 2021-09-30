import IngredientModel from '../../shopping-list/ingredient.model'
import { Subject } from 'rxjs'

export class ShoppingListService {
  ingredientsChanged = new Subject<Array<IngredientModel>>()
  startedEditing = new Subject<number>()

  private ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ]

  getIngredient(index: number) {
    return this.ingredients[index]
  }

  getIngredients() {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: IngredientModel[]) {
    console.log('addIngredients')
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: IngredientModel) {
    console.log('updateIngredient')
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}

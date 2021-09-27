import { EventEmitter, Injectable } from '@angular/core'
import RecipeModel from '../../recipes/recipe.model'
import IngredientModel from '../../shopping-list/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>()

  recipes: Array<RecipeModel> = [
    new RecipeModel(
      'Asparagus',
      'Yuck!',
      'https://i0.hippopx.com/photos/891/700/843/asparagus-italy-piemonte-piedmont-preview.jpg',
      [
        new IngredientModel('asparagus', 12),
        new IngredientModel('milk', 2)
      ]
    ),
    new RecipeModel(
      'Tasty Chicken',
      'Very tasty...',
      'https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg',
      [
        new IngredientModel('chicken', 6),
        new IngredientModel('cheese', 5)
      ]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes(): Array<RecipeModel> {
    // slice will return a new array which will be the exact copy
    // of the recipes array in this service
    return this.recipes.slice()
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[] | undefined): void {
    ingredients && this.shoppingListService.addIngredients(ingredients)
  }
}

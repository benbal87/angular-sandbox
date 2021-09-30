import { Injectable } from '@angular/core'
import RecipeModel from '../../recipes/recipe.model'
import IngredientModel from '../../shopping-list/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs'

@Injectable()
export class RecipeService {
  recipesChanged: Subject<RecipeModel[]> = new Subject<RecipeModel[]>()

  recipes: Array<RecipeModel> = [
    new RecipeModel(
      1,
      'Asparagus',
      'Yuck!',
      'https://i0.hippopx.com/photos/891/700/843/asparagus-italy-piemonte-piedmont-preview.jpg',
      [
        new IngredientModel('asparagus', 12),
        new IngredientModel('milk', 2)
      ]
    ),
    new RecipeModel(
      2,
      'Tasty Chicken',
      'Very tasty...',
      'https://www.seriouseats.com/thmb/svo10-fbaHWS3AfGsoyoM6G5zPw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__02__20200117-coca-cola-chicken-vicky-wasik-26-41493f82b338454e9fc05ed5b250b612.jpg',
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

  getRecipe(id: number | undefined): RecipeModel | undefined {
    return this.recipes.find(r => r.id === id)
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[] | undefined): void {
    ingredients && this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(id: number, recipe: RecipeModel) {
    const recipeOld = this.getRecipe(id)
    if (recipeOld) {
      recipeOld.name = recipe.name
      recipeOld.description = recipe.description
      recipeOld.imagePath = recipe.imagePath
      recipeOld.ingredients = recipe.ingredients
      this.recipesChanged.next(this.recipes.slice())
    }
  }

  deleteRecipe(id: number | undefined) {
    if (id) {
      const index = this.recipes.findIndex(r => r.id === id)
      if (index > -1) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
      }
    }
  }
}

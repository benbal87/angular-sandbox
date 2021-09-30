import IngredientModel from '../shopping-list/ingredient.model'
import { generateNumber } from '../utils/utils'

class RecipeModel {
  public id: number
  public name: string
  public description: string
  public imagePath: string
  public ingredients: Array<IngredientModel>

  constructor(
    id: number | undefined,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Array<IngredientModel>
  ) {
    this.id = id ?? generateNumber()
    this.name = name
    this.description = description
    this.imagePath = imagePath
    this.ingredients = ingredients
  }
}

export default RecipeModel

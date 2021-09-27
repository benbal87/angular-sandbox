import { Component, Input, OnInit } from '@angular/core'
import { RecipeService } from 'src/app/services/recipe/recipe.service'
import RecipeModel from '../recipe.model'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: RecipeModel

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onAddIngredientToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients)
  }
}

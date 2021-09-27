import { Component, OnInit } from '@angular/core'
import RecipeModel from './recipe.model'
import { RecipeService } from '../services/recipe/recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe?: RecipeModel

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.recipeSelected
      .subscribe((recipe: RecipeModel) => {
        this.selectedRecipe = recipe
      })
  }
}

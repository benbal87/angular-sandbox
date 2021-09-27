import { Component, OnInit } from '@angular/core'
import RecipeModel from '../recipe.model'
import { RecipeService } from '../../services/recipe/recipe.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Array<RecipeModel> = []

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes()
  }
}

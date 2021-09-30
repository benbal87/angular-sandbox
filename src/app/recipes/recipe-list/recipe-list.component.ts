import { Component, OnDestroy, OnInit } from '@angular/core'
import RecipeModel from '../recipe.model'
import { RecipeService } from '../../services/recipe/recipe.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Array<RecipeModel> = []
  subscription: Subscription

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.subscription =
      this.recipeService.recipesChanged.subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes
      })
    this.recipes = this.recipeService.getRecipes()
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe()
  }
}

import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { RecipeService } from 'src/app/services/recipe/recipe.service'
import RecipeModel from '../recipe.model'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeIdFromUrl: string | undefined
  recipe?: RecipeModel

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initRecipeDetails()
  }

  initRecipeDetails(): void {
    const recipeId: string = this.activatedRoute.snapshot.params['id']
    this.setRecipeDetailsById(recipeId)
    this.activatedRoute.params.subscribe((params: Params) => {
      this.setRecipeDetailsById(params['id'])
    })
  }

  setRecipeDetailsById(id: string): void {
    if (id) {
      this.recipeIdFromUrl = id
      const recipe = this.recipeService.getRecipe(parseInt(id, 10))
      if (recipe) {
        this.recipe = recipe
      }
    }
  }

  onAddIngredientToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients)
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe?.id)
    this.router.navigate(['/recipes'])
  }
}

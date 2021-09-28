import { Component } from '@angular/core'
import { RecipeService } from '../services/recipe/recipe.service'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService]
})
export class RecipesComponent {
}

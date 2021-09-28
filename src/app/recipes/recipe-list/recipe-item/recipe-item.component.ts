import { Component, Input } from '@angular/core'
import RecipeModel from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input('recipeData') recipe?: RecipeModel
}

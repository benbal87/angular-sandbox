import { Component, Input, OnInit } from '@angular/core'
import { RecipeService } from 'src/app/services/recipe/recipe.service'
import RecipeModel from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeData') recipe?: RecipeModel

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}

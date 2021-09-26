import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import RecipeModel from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeWasSelectedEvent = new EventEmitter<RecipeModel>()

  recipes: Array<RecipeModel> = [
    new RecipeModel(
      'Test Recipe 1',
      'Asparagus',
      'https://i0.hippopx.com/photos/891/700/843/asparagus-italy-piemonte-piedmont-preview.jpg'
    ),
    new RecipeModel(
      'Test Recipe 2',
      'Chicken',
      'https://cdn.pixabay.com/photo/2017/06/21/22/42/recipe-2428926_960_720.jpg'
    )
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: RecipeModel) {
    this.onRecipeWasSelectedEvent.emit(recipe)
  }
}

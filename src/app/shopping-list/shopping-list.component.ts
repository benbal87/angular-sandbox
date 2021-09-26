import { Component, OnInit } from '@angular/core'
import IngredientModel from './ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<IngredientModel> = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  handleOnIngredientAddedEvent(ingredient: IngredientModel) {
    this.ingredients.push(ingredient)
  }
}


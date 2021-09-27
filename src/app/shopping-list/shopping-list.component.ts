import { Component, OnInit } from '@angular/core'
import { ShoppingListService } from '../services/shopping-list/shopping-list.service'
import IngredientModel from './ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<IngredientModel> = []

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: IngredientModel[]) => {
        this.ingredients = ingredients
      })
  }
}


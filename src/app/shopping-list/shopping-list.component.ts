import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ShoppingListService } from '../services/shopping-list/shopping-list.service'
import IngredientModel from './ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<IngredientModel> = []
  private icSubscription?: Subscription

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.icSubscription = this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: IngredientModel[]) => {
        this.ingredients = ingredients
      })
  }

  ngOnDestroy(): void {
    this.icSubscription && this.icSubscription.unsubscribe()
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }
}

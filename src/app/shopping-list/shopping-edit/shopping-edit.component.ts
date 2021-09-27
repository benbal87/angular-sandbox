import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service'
import IngredientModel from '../ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef?: ElementRef
  @ViewChild('amountInput') amountInputRef?: ElementRef

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingredientName = this.nameInputRef?.nativeElement.value
    const ingredientAmount = this.amountInputRef?.nativeElement.value
    const newIngredient = new IngredientModel(ingredientName, ingredientAmount)
    this.shoppingListService.addIngredient(newIngredient)
  }
}

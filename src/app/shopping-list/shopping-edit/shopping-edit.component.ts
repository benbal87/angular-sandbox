import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service'
import IngredientModel from '../ingredient.model'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm!: NgForm

  private subscription!: Subscription
  editMode: boolean = false
  editItemIndex: number = -1
  editedItem: IngredientModel | undefined

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editItemIndex = index
        this.editMode = true
        this.editedItem =
          this.shoppingListService.getIngredient(index)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe()
  }

  onAddItem(form: NgForm) {
    const formValue = form.value
    const newIngredient = new IngredientModel(
      formValue.name,
      formValue.amount
    )
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      )
      this.onClear()
    } else {
      this.shoppingListService.addIngredient(newIngredient)
      this.onClear()
    }
  }

  onClear() {
    this.shoppingListForm.reset()
    this.editItemIndex = -1
    this.editedItem = undefined
    this.editMode = false
    this.editMode = false
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex)
    this.onClear()
  }
}

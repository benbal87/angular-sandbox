import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import IngredientModel from '../ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef?: ElementRef
  @ViewChild('amountInput') amountInputRef?: ElementRef
  @Output() onIngredientAddedEvent = new EventEmitter<IngredientModel>()

  constructor() {
  }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingredientName = this.nameInputRef?.nativeElement.value
    const ingredientAmount = this.amountInputRef?.nativeElement.value
    const newIngredient = new IngredientModel(ingredientName, ingredientAmount)
    this.onIngredientAddedEvent.emit(newIngredient)
  }
}

import { Component, OnInit } from '@angular/core'
import { RecipeService } from '../../services/recipe/recipe.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { isEmpty } from 'lodash'
import IngredientModel from '../../shopping-list/ingredient.model'
import RecipeModel from '../recipe.model'

export type FG = {
  amount: FormControl<number | null>;
  name: FormControl<string | null>
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined
  editMode: boolean = false
  recipeForm!: FormGroup

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const idRaw: string = params['id']
      const id: number = parseInt(idRaw, 10)
      if (id) {
        this.id = id
      }
      this.editMode = idRaw != null
      this.initForm()
    })
  }

  private initForm() {
    const {
      id,
      name,
      description,
      imagePath,
      ingredients
    } = this.getRecipeFormDetails()

    const formIngredients: FormArray<FormGroup<FG>> =
      new FormArray<FormGroup<FG>>([])
    if (!isEmpty(ingredients)) {
      ingredients.forEach((ingredient: IngredientModel) => {
        const { name, amount } = ingredient
        const fg: FormGroup<FG> = new FormGroup({
          'name': new FormControl(name, Validators.required),
          'amount': new FormControl(
            amount,
            [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
          )
        })
        formIngredients.push(fg)
      })
    }

    this.recipeForm = new FormGroup({
      'id': new FormControl(id, Validators.required),
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': formIngredients
    })
  }

  private getRecipeFormDetails(): RecipeModel {
    const recipe = this.recipeService.getRecipe(this.id)
    return this.editMode && this.id && recipe
      ? recipe
      : new RecipeModel(undefined, '', '', '', [])
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(
          null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
        )
      })
    )
  }

  onSubmit() {
    if (this.editMode && this.id) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../', { relativeTo: this.activatedRoute }])
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}

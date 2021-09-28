import { Component, OnInit } from '@angular/core'
import { RecipeService } from '../../services/recipe/recipe.service'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number | undefined
  editMode: boolean = false

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const idRaw: string = params['id']
      const id: number = parseInt(idRaw, 10)
      if (id) {
        this.id = id
      }
      this.editMode = idRaw != null
    })
  }

}

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServerComponent } from './server/server.component'
import { ServersComponent } from './servers/servers.component'
import { HeaderComponent } from './header/header.component'
import { RecipesComponent } from './recipes/recipes.component'
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component'
import { HoverDirective } from './directives/hover/hover.directive'
import { UnlessDirective } from './directives/unless/unless.directive'
import { DropdownDirective } from './directives/dropdown/dropdown.directive'
import { RecipeService } from './services/recipe/recipe.service'
import { ShoppingListService } from './services/shopping-list/shopping-list.service'
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HoverDirective,
    UnlessDirective,
    DropdownDirective,
    NoRecipeSelectedComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

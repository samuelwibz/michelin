import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IRecipe} from '../recipes.model';
import { RecipesService } from '../recipes.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: IRecipe[] = [];


  // @Output() recipeWasSelected = new EventEmitter <Recipes>(); We can also get rid of the single emitter in this component because we have made on in the services


  constructor(private recipeService: RecipesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }


  /* We can get rid of this because we used RecipesServices

  onRecipeSelected(selectedRecipe: Recipes){
      this.recipeWasSelected.emit(selectedRecipe);
  }
  */
}



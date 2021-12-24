import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    
   recipeDetails: IRecipe; //By using the @Input, we can now take data from the parent component of this section ('recipe.component') and access its component features such as the recipe name, description and title
    id: number;
    component: { description: any; };
  constructor( private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe (
        (params: Params) =>{
          this.id = +params['id'];
          this.recipeDetails=this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingListMethod(this.recipeDetails.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route}); //this method doesn't include the use of the id since we are already on the relative path there

    /* Alternative method
      this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}) --> We go up one level and use the 'id' before editing
    */
  }

}

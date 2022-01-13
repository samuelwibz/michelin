import { EventEmitter, Injectable } from '@angular/core';
import { IIngredient } from '../shared/ingredient.model';
import {IRecipe } from './recipes.model'

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipesService {
    recipesChanged = new Subject<IRecipe[]>();
    
    /*
    private recipes: IRecipe[] = [
        {
           name: 'Da Cow', 
           description:'A vegan FRIENDLY dish that all vegans can enjoy', 
           imagePath: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg', 
           ingredients:  [
               {name: 'Phat Cow', amount: 2}
             ]
        }
      ];
      

      recipe1: IRecipe = {
          
          name: 'Da Cow',
          description: 'A vegan FRIENDLY dish that all vegans can enjoy',
          imagePath:
         'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg',
          ingredients: [{ name: 'apple', amount: 5 }],
      }
      */

      recipes: IRecipe[] = [];

      constructor(private shoppingService: ShoppingListService){
   
      }

      setRecipes(recipes: IRecipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice(); //this gets an exact copy of the array above.
      }

      addIngredientsToShoppingList(ingredients: IIngredient[]){
        this.shoppingService.addIngredients (ingredients);
      }

      getRecipe(index: number){
         return this.recipes[index];

         //Alternatively: return this.recipes.slice()[index]
      }

      addRecipe(recipe: IRecipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: IRecipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

}
import { EventEmitter, Injectable } from '@angular/core';
import { IIngredient } from '../shared/ingredient.model';
import {IRecipe } from './recipes.model'

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipesService {

    
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
/*
      recipes: IRecipe[] = [this.recipe1];
*/
      constructor(private shoppingService: ShoppingListService){
   
      }

      getRecipes() {
          return this.recipes.slice(); //this gets an exact copy of the array above.
      }

      addIngredientsToShoppingListMethod(ingredients: IIngredient[]){
        this.shoppingService.addIngredients (ingredients);
      }

      getRecipe(index: number){
         return this.recipes[index];

         //Alternatively: return this.recipes.slice()[index]
      }

}
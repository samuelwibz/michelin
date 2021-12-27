//import { EventEmitter } from "@angular/core";
import { IIngredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    //ingredientsChanged = new EventEmitter <Ingredient []> (); /* we need an emitter since the ingredients array being returned is only a copy, hence the use of '.slice()'.
     //                                                           So we need to inform the component that new data is available and can be added to the ingredients array*/ 

    ingredientsChanged = new Subject<IIngredient[]>();
    startedEditing = new Subject <number>();

    private ingredients: IIngredient[] = [
        {name: 'Apple', amount: 5},
        {name: 'Tomato', amount: 5}
      ];

    //add ingredients

    /*
    onShoppingListAdded(ingredient: Ingredient){
        this.ingredients.push(ingredient);
      }
      */

      addToShoppingList(ingredient: IIngredient){
        this.ingredients.push(ingredient);
       // this.ingredientsChanged.emit(this.ingredients.slice()) //informing other components about the change in the array via emitting the changes

        this.ingredientsChanged.next(this.ingredients.slice());
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      getIngredients(){
          return this.ingredients.slice();
      }

      addIngredients(ingredients: IIngredient []){
           /* OPTION 1: Less Efficient overall
           for (let ingredient of ingredients){
                this.addToShoppingList(ingredient)
           }
           */
          
           this.ingredients.push(...ingredients);   
      
           //this.ingredientsChanged.emit(this.ingredients.slice()); //Notifying other components that the ingredients array has been updated

           this.ingredientsChanged.next(this.ingredients.slice());
      
         }
      
      updateIngredient(index: number, newIngredient: IIngredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}   
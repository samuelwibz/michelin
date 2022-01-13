import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipesService } from "../recipes/recipes.service";
import { IRecipe } from "../recipes/recipes.model";
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipesService) {}

    storeRecipes(){ 
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://recipe-book-cab59-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        }); //Note that the .json must always be added to the end when using firebase
           //if you want to add a 'spinner' as the data is loading you need to subscribe to this observable
    }

    fetchRecipes(){
        return this.http.get<IRecipe[]>('https://recipe-book-cab59-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => { //'map' used with pipe is different to map used as an array method. THEY ARE NOT THE SAME FUNCTION
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []}; //return the ingredients of the recipe, but if there are no ingredients, return an empty ingredients array instead
            });
        }),
         tap(recipes => {
            this.recipesService.setRecipes(recipes);
         })
        )
    }
}

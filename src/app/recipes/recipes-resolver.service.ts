import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { IRecipe } from "./recipes.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<IRecipe[]> {
    constructor(private dataStorageService: DataStorageService, private recipesService: RecipesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        if(recipes.length === 0){ //this condition needs to be added in since the resolver overrides any changes being made to our edit-recipe, so none of the changes are saved by default
             return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}
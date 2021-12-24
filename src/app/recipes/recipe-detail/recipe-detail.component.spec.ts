import {
    Spectator,
    createComponentFactory,
    SpyObject,
    byText,
    SpectatorRouting,
    createRoutingFactory,
} from '@ngneat/spectator';

import { RecipeDetailComponent } from './recipe-detail.component';
import { appRoutes, AppRoutingModule } from 'src/app/app-routing-module';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { IRecipe } from '../recipes.model';
import { IIngredient } from 'src/app/shared/ingredient.model';
import {Location} from '@angular/common';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RecipeEditComponent } from 'src/app/recipe-edit/recipe-edit.component';


describe ('RecipeDetailComponent', () => {
    let spectator: Spectator<RecipeDetailComponent>;
    let location: Location;
    let router: Router;
    
    const createComponent = createComponentFactory({
        component: RecipeDetailComponent,
        imports: [RouterTestingModule.withRoutes(appRoutes)],
        mocks: [RecipesService, ShoppingListService],
        declarations: [RecipeEditComponent],
        providers: [],
        detectChanges: false,
        
      
    });

    beforeEach(() => {
        spectator = createComponent();
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        jasmine.getEnv().allowRespy(true);
    })

    it ('should create the recipe details', () => {
        const recipes: IRecipe[] = [
            {
               name: 'Da Cow', 
               description:'A vegan FRIENDLY dish that all vegans can enjoy', 
               imagePath: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg', 
               ingredients:  [
                   {name: 'Phat Cow', amount: 2}
                 ]
            }
          ];
    
          //Set the component up with a recipe
          const recipeService = spectator.inject(RecipesService);
          recipeService.getRecipe.andReturn(recipes[0]);
          spectator.detectChanges();

          expect (recipeService.getRecipe).toHaveBeenCalled();

          //The title is displayed as 'Da Cow'
          expect('.recipe-title').toContainText('Da Cow');

          //The description is a 'A vegan FRIENDLY dish that all vegans can enjoy'
          expect('.recipe-description').toContainText('A vegan FRIENDLY dish that all vegans can enjoy');

    });

    it (`should add ingredients to the shopping list`, () => {
        const mySpy = spyOn(spectator.component, 'onAddToShoppingList' )
        const recipe: IRecipe = {
            name: 'Da Cow', 
            description:'A vegan FRIENDLY dish that all vegans can enjoy', 
            imagePath: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg', 
            ingredients:  [
                 {name: 'Phat Cow', amount: 2}
            ]
        }
        const recipeService = spectator.inject(RecipesService);
        
        recipeService.getRecipe.andReturn(recipe);
        spyOn(recipeService, 'addIngredientsToShoppingListMethod').and.returnValue('Method called');
        spectator.click('#add-to-shopping-list-button');
        spectator.detectChanges();
     
        expect(mySpy).toBeDefined()
        expect(mySpy).toHaveBeenCalled();
        expect(recipeService.addIngredientsToShoppingListMethod()).toEqual('Method called')
        
    });

    it (`should navigate to'edit-recipe' when button is clicked`,() => {
        const mySpy = spyOn(spectator.component, 'onEditRecipe');
        const recipe: IRecipe = {
            name: 'Da Cow', 
            description:'A vegan FRIENDLY dish that all vegans can enjoy', 
            imagePath: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg', 
            ingredients:  [
                 {name: 'Phat Cow', amount: 2}
            ]
        }
        const recipeService = spectator.inject(RecipesService);
        
        recipeService.getRecipe.andReturn(recipe);
        spectator.click(byText('Edit Recipe'));
        spectator.detectChanges();

        
        expect(mySpy).toBeDefined();
        expect(mySpy).toHaveBeenCalled();
        router.navigate(['/edit']).then(() => {
             expect(location.path()).toBe('/edit')
        })
       
    })

    /*
    router.navigate(["/shopping-list"]).then(() => {
            expect(location.path()).toBe("/shopping-list");
        })
        */

    
    
})

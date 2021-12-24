import {
    Spectator,
    SpyObject,
    createComponentFactory
} from '@ngneat/spectator';

import { of } from 'rxjs';
import { ShoppingEditComponent } from './shopping-edit.component';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { ShoppingListService } from '../shopping-list.service';
import { appRoutes, AppRoutingModule } from 'src/app/app-routing-module';
import { IRecipe } from 'src/app/recipes/recipes.model';
import { IIngredient } from 'src/app/shared/ingredient.model';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

fdescribe (`ShoppingEditComponent`, () => {
    let component: ShoppingEditComponent;
    let fixture: ComponentFixture<ShoppingEditComponent>;
    let shoppingService: ShoppingListService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ShoppingEditComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [ShoppingListService]
        })
        fixture = TestBed.createComponent(ShoppingEditComponent);
        component = fixture.componentInstance;
        shoppingService = TestBed.get(ShoppingListService);
        fixture.detectChanges();
    })

    it(`should invalidate form upon loading `, () => {
       expect(component.shoppingEditForm.valid).toBeFalsy();
    })

    it(`should render two input elements upon initalising`, () => {
        const formElement = fixture.debugElement.nativeElement.querySelector('#shoppingEditForm');
        const inputElements = formElement.querySelectorAll('input');
        
        expect(inputElements.length).toEqual(2);
    })

    it('should initally have all input values empty upon initialisation', () => {
        const shoppingEditFormGroup = component.shoppingEditForm;
        const shoppingEditFormValues = new FormGroup ({
            itemDetails: new FormGroup({
            name: new FormControl(''),
            amount: new FormControl('')
            })
        })
        expect(shoppingEditFormGroup.value).toEqual(shoppingEditFormValues);
    })
})


/*


describe ('RecipeDetailComponent', () => {


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

    */
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
        const shoppingEditFormValues = {
            itemDetails: {
                 name: null,
                 amount:null
            }
        }
        expect(shoppingEditFormGroup.value).toEqual(shoppingEditFormValues);
    })

    it(`should disable the 'add' button when the form is not valid`, () => {
        const shoppingEditFormAddBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
        const shoppingEditForm = component.shoppingEditForm.valid

        expect(shoppingEditForm).toBeFalsy();
        expect (shoppingEditFormAddBtn.disabled).toBeTruthy();
    }) 

    it (`should return an error if 'name' field is empty`,() => {
        //Arrange   
            let errors = {}
            let shoppingEditForm = component.shoppingEditForm.get(['itemDetails', 'name']);
            let shoppingEditFormInput = fixture.debugElement.nativeElement;

        //Act
            errors = shoppingEditForm.errors||{};
            shoppingEditForm.markAsTouched();
            shoppingEditForm.setValue('');
            fixture.detectChanges();

        //Assert
            expect(errors['required']).toBeTruthy();
            expect(shoppingEditForm.touched).toBeTruthy();
            expect(shoppingEditFormInput.querySelector('#name-error').textContent).toBe('This field is required');
    })

    it(`should validate the 'name' field if a characters are entered into the input bar`, () => {
        //Arrange
        const shoppingEditFormNameElement = component.shoppingEditForm.get(['itemDetails', 'name']);

        //Act
        shoppingEditFormNameElement.setValue('Egg');
       
        //Assert
        expect(shoppingEditFormNameElement.errors).toBeNull();
    })

    it(`should return an error if 'amount' field is empty`, () => {
        //Arrange 
            let errors = {};
            let shoppingEditForm = component.shoppingEditForm.get(['itemDetails', 'amount']);
            let shoppingEditFormInput = fixture.debugElement.nativeElement;
        
        //Act
            errors = shoppingEditForm.errors||{};
            shoppingEditForm.markAllAsTouched();
            shoppingEditForm.setValue(null);
            fixture.detectChanges();

        //Assert
            expect(errors['required']).toBeTruthy();
            expect(shoppingEditForm.touched).toBeTruthy();
            expect(shoppingEditFormInput.querySelectorAll('#amount-error')[0].textContent).toBe('This field is required');
    })

    it(`should return an error if value of the 'amount' field is less than 0`, () => {
        //Arrange
            let shoppingEditForm = component.shoppingEditForm.get(['itemDetails', 'amount']);
            let shoppingEditFormInput = fixture.debugElement.nativeElement;

        //Act
            shoppingEditForm.markAllAsTouched();
            shoppingEditForm.setValue(-3);
            fixture.detectChanges();

        //Assert
            expect(shoppingEditForm.touched).toBeTruthy();
            expect(shoppingEditFormInput.querySelectorAll('#amount-error')[0].textContent).toBe('Amount has to be greater than 0');
    })
})

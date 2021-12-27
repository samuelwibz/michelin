import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe } from '../recipes/recipes.model';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  amountPattern = "^[1-9]+[0-9]*$";
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private recipeService: RecipesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params 
      .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params ['id'] != null;
            this.initForm();
          }
      )
  }

  onSubmit(){
    const newRecipe: IRecipe = {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      imagePath: this.recipeForm.value['imagePath'],
      ingredients:this.recipeForm.value['ingredients']
    } as IRecipe;
    
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe); //otherwise you can put in this.recipeForm.value instead of newRecipe since it is already in the format of IRecipe model
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }


  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        'name': [null, Validators.required],
        'amount': [null, [Validators.required, Validators.pattern(this.amountPattern)]]
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route}); //takes us back one level up from this componnt
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
       for(let ingredient of recipe.ingredients){
        recipeIngredients.push(
          this.fb.group({
            'name': [ingredient.name, Validators.required],
            'amount': [ingredient.amount, [Validators.required, Validators.pattern(this.amountPattern)]]
          })
        )
       }
      }
    }

    this.recipeForm = this.fb.group ({
      'name': [recipeName, Validators.required],
      'imagePath': [recipeImagePath, Validators.required],
      'description': [recipeDescription, Validators.required],
      'ingredients': recipeIngredients
    })
  } 

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecipe } from '../../recipes.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input()recipe: IRecipe;
  @Input()index: number;


  ngOnInit(): void {

  }

 

}

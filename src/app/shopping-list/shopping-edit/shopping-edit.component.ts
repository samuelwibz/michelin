import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IIngredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
;

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Output() shoppingListCreated = new EventEmitter<IIngredient> ();
  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: IIngredient;
  shoppingEditForm!: FormGroup;
  amountPattern = "^[1-9]+[0-9]*$";
 

  constructor(private shoppingService: ShoppingListService, private fb: FormBuilder) { }

  ngOnInit(): void {
   
    this.shoppingEditForm = this.fb.group ({
      itemDetails: this.fb.group({
          name: [null, [Validators.required] ],
          amount: [null, [Validators.required, Validators.pattern(this.amountPattern)]]
      })
    })

    this.editingSubscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingEditForm.setValue({
          itemDetails: {
            name: this.editedItem.name,
            amount: this.editedItem.amount
          }
        })
      }
    );

    this.shoppingEditForm.statusChanges.subscribe((status) => {
      console.log(status);
    })
  }

  onSubmitItems(){
      //this.shoppingListCreated.emit({name: this.itemNameInput.nativeElement.value, amount: this.itemAmountInput.nativeElement.value});
     const newIngredient: IIngredient = {name: this.shoppingEditForm.get('itemDetails.name').value, amount:this.shoppingEditForm.get('itemDetails.amount').value} as IIngredient;
     // this.shoppingListCreated.emit(newIngredient);
     if(this.editMode){
       this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
     } else {
       this.shoppingService.addToShoppingList(newIngredient);
     }
     this.editMode = false;
     this.shoppingEditForm.reset();
  }

  ngOnDestroy(): void {
      this.editingSubscription.unsubscribe();
  }

}

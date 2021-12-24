import {
    Spectator,
    createComponentFactory,
    SpyObject
} from '@ngneat/spectator';
import { RecipeItemComponent } from './recipe-item.component';
import {appRoutes, AppRoutingModule} from 'src/app/app-routing-module';
import { RecipesService } from '../../recipes.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { IRecipe } from '../../recipes.model';
import { of } from 'rxjs';

describe ('RecipeItemComponent', () => {
    let spectator : Spectator<RecipeItemComponent>;
    let component: any;

    const createComponent = createComponentFactory({
        component: RecipeItemComponent,
        imports: [AppRoutingModule],
        mocks: [RecipesService, ShoppingListService],
        providers: [],
        detectChanges: false
    })

    beforeEach(() => {
        spectator = createComponent();
        component = spectator.component;
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    it('should create the recipe item with the name, description and image path', () => {
        spectator.setInput('recipe', {
            name: 'Da Cow',
            description: 'A vegan FRIENDLY dish that all vegans can enjoy',
            imagePath:
              'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg',
            ingredients: [{ name: 'Phat Cow', amount: 1 }],
        } );

        spectator.detectChanges();

        expect ('.recipe-title').toContainText('Da Cow');

        expect ('.recipe-description').toContainText('A vegan FRIENDLY dish that all vegans can enjoy');
    })
})
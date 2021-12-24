import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { AppRoutingModule, appRoutes } from '../app-routing-module';
import { RecipesComponent } from '../recipes/recipes.component';
import { IRecipe } from '../recipes/recipes.model';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { HeaderComponent } from './header.component';
import {Location} from '@angular/common';


describe ('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let location: Location;
    let router: Router;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(appRoutes), AppRoutingModule ],
            declarations:[HeaderComponent, ShoppingListComponent, RecipesComponent]
        })
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(HeaderComponent);
        router.initialNavigation();
        component = fixture.componentInstance;  
        fixture.detectChanges();
    })

    it(`should create`, () => {
        expect(component).toBeTruthy();
    })

    it(`should display the text 'Recipe Book' as the Navbar title`, () =>{
        let navbarTitleEl = fixture.debugElement.query(By.css('.navbar-brand'));
        expect(navbarTitleEl.nativeElement.textContent).toBe('Recipe Book');
    })

    it(`should display the first navbar list element as 'Recipes and Shopping List`, () => {
        let navbarListEl  = fixture.debugElement.queryAll(By.css('.nav a'));
        expect(navbarListEl[0].nativeElement.textContent).toBe('Recipes');
        expect(navbarListEl[1].nativeElement.textContent).toBe('Shopping List');
    })

    it("fakeAsync works", fakeAsync(() => {
        let promise = new Promise (resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }))

    it(`navigate to "recipes" redirects you to /recipes`, fakeAsync(() => {
        router.navigate(["/recipes"]).then(() => {
            expect(location.path()).toBe("/recipes");
        });
    }));

    it(`navigate to "shopping-list" redirects you to /shopping-list`, fakeAsync(() => {
        router.navigate(["/shopping-list"]).then(() => {
            expect(location.path()).toBe("/shopping-list");
        })
    }));


//headingEl = fixture.debugElement.query(By.css('.slogan h1'));
    /*
    it(`Heading should display the title 'GeekFlix'`,() => {
        //fixture.detectChanges();
      expect(headingEl.nativeElement.textContent.trim()).toBe('');
      //expect(fixture.debugElement.nativeElement.querySelecto('h1').textContent).toContain('GeekFlix') 
  })
  */
});
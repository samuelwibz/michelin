import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-one-list';
  loadedFeature = 'recipe';

  onNavigateFeature(myFeature: string){
    this.loadedFeature = myFeature;
  }
  
}

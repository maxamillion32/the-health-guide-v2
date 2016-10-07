import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Models
import { Recipe } from '../../../models';

// Providers
import { RecipeService } from '../../../providers';

@Component({
  templateUrl: 'recipe-list.html'
})
export class RecipeList implements OnInit {
  public allUsersRecipes: Observable<Recipe[]>;
  public myRecipes: FirebaseListObservable<Recipe[]>;
  public recipeOwner: string = "mine";
  public searchBy: string = "name";
  public searchQuery: string = "";

  constructor(private af: AngularFire, private navCtrl: NavController, private recipeSvc: RecipeService) {}

  public resetSearch(): void {
    this.searchQuery = "";
  }

  ngOnInit(): void {
    this.myRecipes = this.recipeSvc.getMyRecipes();
    this.allUsersRecipes = this.recipeSvc.getAllRecipes();
  }

}

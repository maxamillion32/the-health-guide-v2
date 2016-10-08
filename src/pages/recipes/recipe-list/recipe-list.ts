import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Models
import { Recipe } from '../../../models';

// Pages
import { RecipeDetails } from '../recipe-details/recipe-details';

// Providers
import { RecipeService } from '../../../providers';

@Component({
  templateUrl: 'recipe-list.html'
})
export class RecipeList implements OnInit {
  public allRecipes: Observable<Recipe[]>;
  public myRecipes: FirebaseListObservable<Recipe[]>;
  public recipeOwner: string = "mine";
  public searchBy: string = "name";
  public searchQuery: string = "";

  constructor(private af: AngularFire, private navCtrl: NavController, private recipeSvc: RecipeService) {}

  public resetSearch(): void {
    this.searchQuery = "";
  }

  public viewRecipe(recipe: Recipe) {
    this.navCtrl.push(RecipeDetails, { recipe });
  }

  ngOnInit(): void {
    this.myRecipes = this.recipeSvc.getMyRecipes();
    this.allRecipes = this.recipeSvc.getAllRecipes();
  }

}

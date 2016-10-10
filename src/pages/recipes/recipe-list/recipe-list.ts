import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Models
import { Recipe } from '../../../models';

// Pages
import { RecipeDetails } from '../recipe-details/recipe-details';
import { RecipeEdit } from '../recipe-edit/recipe-edit';

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

  constructor(private af: AngularFire, private alertCtrl: AlertController, private navCtrl: NavController, private recipeSvc: RecipeService) {}

  public createRecipe(): void {
    let recipe: Recipe = new Recipe();
    this.navCtrl.push(RecipeEdit, { recipe });
  }

  public editRecipe(recipe: Recipe): void {
    this.navCtrl.push(RecipeEdit, { recipe });
  }

  public removeRecipe(recipe: Recipe): void {
    let confirm = this.alertCtrl.create({
      title: 'Remove recipe?',
      message: 'By agreeing you will delete this recipe forever',
      buttons: [
        {
          text: 'Agree',
          handler: () => {
            this.recipeSvc.removeRecipe(recipe);
          }
        },
        {
          text: 'Disgree',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

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

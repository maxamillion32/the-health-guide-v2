import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// Models
import { Food, Recipe } from '../../../models';

// Providers
import { NutritionService, RecipeService } from '../../../providers';

@Component({
  templateUrl: 'ingredient-search.html'
})
export class IngredientSearch implements OnInit {
  public food: FirebaseListObservable<Food[]>;
  public ingredientType: string = 'food';
  public noQuantity: boolean = false;
  public recipes: Observable<Recipe[]>;
  public selectedIngredients: any[] = [];
  public searchQuery: string = '';

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private nutritionSvc: NutritionService,
    private params: NavParams,
    private recipeSvc: RecipeService,
    private viewCtrl: ViewController
  ) { }

  public cancelAdd(): void {
    this.viewCtrl.dismiss();
  }

  public doneAdding(): void {
    this.viewCtrl.dismiss(this.selectedIngredients);
  }

  public resetSearch(): void {
    this.searchQuery = "";
  }

  public setIngredient(ingredient: any, checkEl: any): void {
    let idx: number = this.selectedIngredients.indexOf(ingredient);
    if (idx >= 0) {
      this.selectedIngredients.splice(idx, 1);
    } else if (!this.noQuantity) {
      ingredient.quantity = 100 || ingredient.quantity;
      ingredient.amount = 1 || ingredient.amount;
      let quantityAlert = this.alertCtrl.create({
        title: `${ingredient.name}`,
        message: "Enter quantity",
        inputs: [
          {
            name: 'quantity',
            placeholder: ingredient.hasOwnProperty('chef') ? 'Units' : 'Grams',
            type: 'number'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              checkEl.checked = false;
            }
          },
          {
            text: 'Save',
            handler: data => {
              if (!!data.quantity) {
                if (ingredient.hasOwnProperty('chef')) {
                  ingredient.amount = +data.quantity;
                } else {
                  ingredient.quantity = +data.quantity;
                }
                this.selectedIngredients.push(ingredient);
              } else {
                checkEl.checked = false;
              }
            }
          }
        ]
      });
      quantityAlert.present();
    } else {
      this.selectedIngredients.push(ingredient);
    }
  }

  ngOnInit(): void {
    this.food = this.nutritionSvc.getFood();
    this.recipes = this.recipeSvc.getAllRecipes();
    this.selectedIngredients = [...this.params.get('ingredients')];
    // This flag is used to enabled/disable the quantity alert when checking an ingredient
    // For instance, it is set to true when we are filtering recipes by ingredients
    this.noQuantity = this.params.get("noQuantity");
  }

}

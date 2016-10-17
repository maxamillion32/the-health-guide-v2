import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';

// Models
import { Food, Recipe } from '../../models';

// Providers
import { NutritionService, RecipeService } from '../../providers';

@Component({
  templateUrl: 'meal-search.html'
})
export class MealSearchPage implements OnInit {
  public food: FirebaseListObservable<Food[]>;
  public mealType: string = 'food';
  public noQuantity: boolean = false;
  public recipes: Observable<Recipe[]>;
  public selectedMeals: any[] = [];
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
    this.viewCtrl.dismiss(this.selectedMeals);
  }

  public resetSearch(): void {
    this.searchQuery = "";
  }

  public setMeal(meal: any, checkEl: any): void {
    let idx: number = this.selectedMeals.indexOf(meal);
    if (idx >= 0) {
      this.selectedMeals.splice(idx, 1);
    } else if (!this.noQuantity) {
      meal.quantity = 100 || meal.quantity;
      meal.amount = 1 || meal.amount;
      let quantityAlert = this.alertCtrl.create({
        title: `${meal.name}`,
        message: "Enter quantity",
        inputs: [
          {
            name: 'quantity',
            placeholder: meal.hasOwnProperty('chef') ? 'Portions' : 'Grams',
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
                if (meal.hasOwnProperty('chef')) {
                  meal.amount = +data.quantity;
                } else {
                  meal.quantity = +data.quantity;
                }
                this.selectedMeals.push(meal);
              } else {
                checkEl.checked = false;
              }
            }
          }
        ]
      });
      quantityAlert.present();
    } else {
      this.selectedMeals.push(meal);
    }
  }

  ngOnInit(): void {
    this.food = this.nutritionSvc.getFood();
    this.recipes = this.recipeSvc.getAllRecipes();
    this.selectedMeals = [...this.params.get('meals')];
    // This flag is used to enabled/disable the quantity alert when checking an meal
    // For instance, it is set to true when we are filtering recipes by meals
    this.noQuantity = this.params.get("noQuantity");
  }

}

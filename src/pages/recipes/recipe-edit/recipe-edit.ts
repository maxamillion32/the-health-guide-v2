import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from 'ionic-angular';

// Models
import { Recipe } from '../../../models';

// Pages
import { IngredientSearch } from '../ingredient-search/ingredient-search';

const DIETARIES = [
  "Gluten-free",
  "High-fiber",
  "High-protein",
  "Low-carb",
  "Low-fat",
  "Mediteranean",
  "Vegetarian"
];

@Component({
  templateUrl: 'recipe-edit.html'
})
export class RecipeEdit implements OnInit {
  public checkedDietaries: string[];
  public recipe: Recipe;
  public recipeSteps: string[] = [];

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, private navCtrl: NavController, private params: NavParams) { }

  public addStep(): void {
        this.recipeSteps.push('');
        this.recipe.steps.push('');
    }

  public changeQuantity(ingredient: any): void {
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
            console.log('Canceled');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (ingredient.hasOwnProperty('chef')) {
              ingredient.amount = +data.quantity;
            } else {
              ingredient.quantity = +data.quantity;
            }
          }
        }
      ]
    });
    quantityAlert.present();
  }

  public searchIngredient(): void {
    let ingredientsModal = this.modalCtrl.create(IngredientSearch, {
      ingredients: this.recipe.ingredients,
      noQuantity: false
    });
    ingredientsModal.onDidDismiss(ingredients => {
      this.recipe.ingredients = [...ingredients];
    });
    ingredientsModal.present()
  }

  public selectDietaries(): void {
    let checkboxAlert = this.alertCtrl.create();
    checkboxAlert.setTitle('Which planets have you visited?')
    DIETARIES.forEach(item => {
      checkboxAlert.addInput({
        type: 'checkbox',
        label: `${item}`,
        value: `${item}`
      });
    })
    checkboxAlert.addButton('Cancel');
    checkboxAlert.addButton({
      text: 'Okay',
      handler: data => {
        this.checkedDietaries = [...data];
      }
    });
    checkboxAlert.present();
  }

  public removeDietary(index: number): void {
    this.checkedDietaries.splice(index, 1);
  }

  ngOnInit(): void {
    this.recipe = this.params.get("recipe");
    console.log(this.recipe);
  }

}

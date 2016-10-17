import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

// Models
import { Recipe } from '../../../models';

// Pages
import { MealSearchPage } from '../../meal-search/meal-search';

// Providers
import { RecipeService } from '../../../providers';

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
export class RecipeEditPage implements OnInit {
  public recipe: Recipe;
  public recipeDetails: string = "summary";

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private params: NavParams,
    private recipeSvc: RecipeService,
    private toastCtrl: ToastController
  ) { }

  public addStep(): void {
    let prompt = this.alertCtrl.create({
      title: "Instruction",
      message: "Add a new recipe step",
      inputs: [
        {
          name: 'instruction',
          placeholder: 'Instruction'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (!!data && data.instruction !== "") {
              this.recipe.steps.push(data.instruction);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  public changeInstruction(index: number): void {
    let prompt = this.alertCtrl.create({
      title: "Instruction",
      message: `Change step ${index + 1} of the recipe`,
      inputs: [
        {
          name: 'instruction',
          placeholder: 'Instruction'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (!!data && data.instruction !== "") {
              this.recipe.steps[index] = data.instruction;
            }
          }
        }
      ]
    });
    prompt.present();
  }

  public changeQuantity(ingredient: any): void {
    let quantityAlert = this.alertCtrl.create({
      title: `${ingredient.name}`,
      message: "Enter quantity",
      inputs: [
        {
          name: 'quantity',
          placeholder: ingredient.hasOwnProperty('chef') ? 'Portions' : 'Grams',
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

  public createRecipe(): void {
    let notifToast = this.toastCtrl.create({
      message: 'Please complete the entire recipe!',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    if (this.recipe.steps.length === 0) {
      notifToast.present();
    } else if (this.recipe.ingredients.length === 0) {
      notifToast.present();
    } else {
      this.recipeSvc.setRecipeNutrition(this.recipe);
      if (this.recipe.hasOwnProperty('$key')) {
        this.recipeSvc.updateRecipe(this.recipe);
      } else {
        this.recipeSvc.addRecipe(this.recipe);
      }
      this.navCtrl.pop();
    }
  }

  public removeDietary(index: number): void {
    this.recipe.dietaries.splice(index, 1);
  }

  public removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  public removeStep(index: number): void {
    this.recipe.steps.splice(index, 1);
  }

  public searchIngredient(): void {
    let ingredientsModal = this.modalCtrl.create(MealSearchPage, {
      meals: this.recipe.ingredients,
      noQuantity: false
    });
    ingredientsModal.onDidDismiss(ingredients => {
      if (!!ingredients) {
        this.recipe.ingredients = [...ingredients];
      }
    });
    ingredientsModal.present()
  }

  public selectDietaries(): void {
    let checkboxAlert = this.alertCtrl.create();
    checkboxAlert.setTitle('Which planets have you visited?')
    DIETARIES.forEach(item => {
      let checked: boolean = !!this.recipe.dietaries.filter(dietary => dietary === item)[0];
      checkboxAlert.addInput({
        type: 'checkbox',
        label: `${item}`,
        value: `${item}`,
        checked: checked
      });
    })
    checkboxAlert.addButton('Cancel');
    checkboxAlert.addButton({
      text: 'Okay',
      handler: data => {
        if (data) {
          this.recipe.dietaries = [...data];
        }
      }
    });
    checkboxAlert.present();
  }

  ngOnInit(): void {
    this.recipe = this.params.get("recipe");
    console.log(this.recipe);
  }

}

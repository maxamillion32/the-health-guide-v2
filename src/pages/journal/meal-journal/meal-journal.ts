import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ModalController } from 'ionic-angular';

// Models
import { MealJournal } from '../../../models';

// Pages
import { MealSearchPage } from '../../meal-search/meal-search';

// Providers
import { MealService } from '../../../providers';

@Component({
  templateUrl: 'meal-journal.html'
})
export class MealJournalPage implements OnInit {
  public currentDate: string;
  public mealJournal: MealJournal;
  constructor(
    private alertCtrl: AlertController,
    private mealSvc: MealService,
    private modalCtrl: ModalController,
    public navCtrl: NavController) { }

  public changeQuantity(meal: any): void {
    let quantityAlert = this.alertCtrl.create({
      title: `${meal.name}`,
      message: "Enter quantity",
      inputs: [
        {
          name: 'quantity',
          placeholder: MealService.hasOwnProperty('chef') ? 'Portions' : 'Grams',
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
            meal.amount = +data.quantity;
          }
        }
      ]
    });
    quantityAlert.present();
  }

  public removeMeal(mealTime: string, index: number): void {
    this.mealJournal[mealTime].meals.splice(index, 1);
  }

  public searchMeal(mealTime: string): void {
    let mealTimeAlert = this.alertCtrl.create({
      title: "Add meal",
      message: "Please select a meal time",
      inputs: [
        {
          value: 'breakfast',
          label: 'Breakfast',
          type: 'radio'
        },
        {
          value: 'brunch',
          label: 'Brunch',
          type: 'radio'
        },
        {
          value: 'lunch',
          label: 'Lunch',
          type: 'radio'
        },
        {
          value: 'snack',
          label: 'Snack',
          type: 'radio'
        },
        {
          value: 'dinner',
          label: 'Dinner',
          type: 'radio'
        }

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
            let mealSearchModal = this.modalCtrl.create(MealSearchPage, {
              meals: [] || this.mealJournal[data].meals,
              noQuantity: false
            });
            mealSearchModal.onDidDismiss(meals => {
              if (!!meals) {
                this.mealJournal[data].meals = [...meals];
              }
            });
            mealSearchModal.present();
          }
        }
      ]
    });
    mealTimeAlert.present();
  }

  public syncMj(): void {
    this.mealJournal = new MealJournal();
    this.mealSvc.getMjByDate(this.currentDate).subscribe(mj => {
      if (!!mj) {
        this.mealJournal = mj;
      }
    });
  }

  public updateMj(): void {
    this.mealJournal.date = this.currentDate;
    this.mealSvc.setMjNutrition(this.mealJournal);
    if (this.mealJournal.hasOwnProperty('$key')) {
      this.mealSvc.updateMealJournal(this.mealJournal);
    } else {
      this.mealSvc.addMealJournal(this.mealJournal);
    }
  }

  ngOnInit(): void {
    let myDate = new Date(),
      currentDay = myDate.getDate(),
      currentMonth = myDate.getMonth() + 1,
      currentYear = myDate.getFullYear();
    this.currentDate = currentYear + '-' + ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);
    this.syncMj();
  }

}

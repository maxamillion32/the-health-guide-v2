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
    let mealsModal = this.modalCtrl.create(MealSearchPage, {
      meals: this.mealJournal[mealTime].meals,
      noQuantity: false
    });
    mealsModal.onDidDismiss(meals => {
      if (!!meals) {
        this.mealJournal[mealTime].meals = [...meals];
      }
    });
    mealsModal.present()
  }

  public syncMj(): void {
    this.mealJournal = new MealJournal();
    this.mealSvc.getMjByDate(this.currentDate).subscribe(mj => this.mealJournal = mj);
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

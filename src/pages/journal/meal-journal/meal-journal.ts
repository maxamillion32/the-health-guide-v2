import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

// Models
import { MealJournal } from '../../../models';

// Providers
import { MealService } from '../../../providers';

@Component({
  templateUrl: 'meal-journal.html'
})
export class MealJournalPage implements OnInit {
  public currentDate: string;
  public mealJournal: MealJournal;
  constructor(private mealSvc: MealService, public navCtrl: NavController) { }

  public syncMj(): void {
    this.mealJournal = new MealJournal();
    this.mealSvc.getMjByDate(this.currentDate).then(mj => this.mealJournal = mj);
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

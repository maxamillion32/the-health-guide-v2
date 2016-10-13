import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-meal-journal',
  templateUrl: 'meal-journal.html'
})
export class MealJournal {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MealJournal Page');
  }

}

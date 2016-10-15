import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ActivityJournal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity-journal',
  templateUrl: 'activity-journal.html'
})
export class ActivityJournalPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ActivityJournal Page');
  }

}

import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

// Models
import { ActivityJournal } from '../../../models'

// Providers
import { ActivityService } from '../../../providers'

@Component({
  selector: 'page-activity-journal',
  templateUrl: 'activity-journal.html'
})
export class ActivityJournalPage {
  public activityJournal: FirebaseListObservable<ActivityJournal[]>;
  public currentDate: string;

  constructor(private activitySvc: ActivityService) {}

  ngOnInit(): void {
    let myDate = new Date(),
      currentDay = myDate.getDate(),
      currentMonth = myDate.getMonth() + 1,
      currentYear = myDate.getFullYear();
    this.currentDate = currentYear + '-' + ((currentMonth < 10) ? '0' + currentMonth : currentMonth) + '-' +
      ((currentDay < 10) ? '0' + currentDay : currentDay);

    this.activitySvc.changeDate(this.currentDate);
    this.activityJournal = this.activitySvc.getActivityJournals();
    this.activityJournal.subscribe(aj => console.log(aj));
  }

}

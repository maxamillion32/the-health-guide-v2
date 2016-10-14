import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

// Models
import { Activity, ActivityGroup, ActivityJournal } from '../models';

@Injectable()
export class ActivityService {
  private activityJournals: FirebaseListObservable<ActivityJournal[]>;

  constructor(private af: AngularFire, private auth: FirebaseAuth) {
    this.auth.subscribe(authData => {
      if (authData) {
        this.activityJournals = af.database.list(`/meal-journals/${authData.uid}`, {
          query: {
            orderByChild: 'date'
          }
        });
      }
    });
  }

  public addActivityJournal(aj: ActivityJournal): void {
    this.getAjByDate(aj.date).then(res => {
      res.activities = [...aj.activities];
      res.totalDuration = aj.totalDuration;
      res.totalEnergy = aj.totalEnergy;
      this.updateActivityJournal(res);
    }).catch(err => this.activityJournals.push(aj));
  }

  public getActivityEnergy(activity: Activity, weight: number = 70): number {
    return Math.floor(0.0175 * activity.met * weight * activity.time);
  }

  public getActivityJournals(): Observable<ActivityJournal[]> {
    return this.activityJournals.map(aj => aj.reverse());
  }

  public getAjByDate(date: string): Promise<ActivityJournal> {
    return new Promise((resolve, reject) => {
      let journal: ActivityJournal = new ActivityJournal();
      this.getActivityJournals().subscribe(actJournals => {
        if (actJournals) {
          journal = actJournals.filter(aj => aj.date === date)[0];
          if (journal) {
            resolve(journal);
          } else {
            reject("No activity journal on this date");
          }
        }
      });
    });
  }

  public removeActivityJournal(aj: ActivityJournal): void {
    this.activityJournals.remove(aj['$key']);
  }

  public setupActivityJournal(aj: ActivityJournal, weight: number = 70): void {
    aj.totalDuration = 0, aj.totalEnergy = 0;
    aj.activities.forEach(act => {
      aj.totalEnergy += this.getActivityEnergy(act, weight);
      aj.totalDuration += act.time;
    });
  }

  public updateActivityJournal(aj: ActivityJournal): void {
    this.activityJournals.update(aj['$key'], {
      activities: aj.activities,
      totalEnergy: aj.totalEnergy,
      totalDuration: aj.totalDuration
    });
  }
}

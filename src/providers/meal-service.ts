import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import { Immutable } from 'immutable/dist';

// Models
import { MealJournal } from '../models';

@Injectable()
export class MealService {
    private mealJournals: FirebaseListObservable<MealJournal[]>;

    constructor(private af: AngularFire, private auth: FirebaseAuth) {
        this.auth.subscribe(authData => {
            if (authData) {
                this.mealJournals = af.database.list(`/meal-journals/${authData.uid}`, {
                    query: {
                        orderByChild: 'date'
                    }
                });
            }
        });
    }

    public addMealJournal(mj: MealJournal): void {
        this.getMjByDate(mj.date).then(res => {
            res.breakfast = mj.breakfast,
            res.brunch = mj.brunch,
            res.lunch = mj.lunch,
            res.snack = mj.snack,
            res.dinner = mj.dinner,
            res.remainingNutrition = mj.remainingNutrition,
            res.requiredNutrition = mj.requiredNutrition,
            res.totalNutrition = mj.totalNutrition,
            res.notes = mj.notes
            this.updateMealJournal(res);
        }).catch(err => this.mealJournals.push(mj));
    }

    public getMealJournals(): Observable<MealJournal[]> {
        return this.mealJournals.map(mj => mj.reverse());
    }

    public getMjByDate(date: string): Promise<MealJournal> {
        return new Promise((resolve, reject) => {
            let journal: MealJournal = new MealJournal();
            this.getMealJournals().subscribe(mealJournals => {
                if (mealJournals) {
                    journal = mealJournals.filter(mj => mj.date === date)[0];
                    if (journal) {
                        resolve(journal);
                    } else {
                        reject("No meal journal on this date");
                    }
                }
            });
        });
    }

    public updateMealJournal(mj: MealJournal): void {
        this.mealJournals.update(mj['$key'], {
            date: mj.date,
            breakfast: mj.breakfast,
            brunch: mj.brunch,
            lunch: mj.lunch,
            snack: mj.snack,
            dinner: mj.dinner,
            remainingNutrition: mj.remainingNutrition,
            requiredNutrition: mj.requiredNutrition,
            totalNutrition: mj.totalNutrition,
            notes: mj.notes
        });
    }
}

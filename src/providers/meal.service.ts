import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
// import { Immutable } from 'immutable/dist';

// Models
import { MealJournal, Nutrition } from '../models';

@Injectable()
export class MealService {
    private mealJournals: FirebaseListObservable<MealJournal[]>;
    constructor(private af: AngularFire, private auth: FirebaseAuth) {
        this.auth.subscribe(authData => {
            if (!!authData) {
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
                if (!!mealJournals) {
                    journal = mealJournals.filter(mj => mj.date === date)[0];
                    if (!!journal) {
                        resolve(journal);
                    } else {
                        reject("No meal journal on this date");
                    }
                }
            });
        });
    }

    public setMealTimeNutrition(mj: MealJournal): void {
        for (let key in mj) {
            let mealTime = mj[key];
            if (mealTime.hasOwnProperty('meals') && mealTime.meals.length > 0) {
                mealTime.total = new Nutrition();
                mealTime.meals.forEach(meal => {
                    if (meal.hasOwnProperty("chef")) {
                        // The meal is a recipe
                        for (let nutrientGroup in meal.nutrients) {
                            let nutrients = meal.nutrients[nutrientGroup];
                            if (nutrientGroup === 'energy') {
                                mealTime.total[nutrientGroup] += nutrients * meal.amount;
                            } else if (typeof nutrients === 'object') {
                                for (let nutrient in nutrients) {
                                    mealTime.total[nutrientGroup][nutrient] += nutrients[nutrient] * meal.amount;
                                }
                            }
                        }
                    } else {
                        // The meal is a basic food
                        for (let nutrientGroup in meal) {
                            let nutrients = meal[nutrientGroup];
                            if (nutrientGroup === 'energy') {
                                mealTime.total[nutrientGroup] += nutrients * (meal.amount / 100);
                            } else if (typeof nutrients === 'object') {
                                for (let nutrient in nutrients) {
                                    mealTime.total[nutrientGroup][nutrient] += nutrients[nutrient] * (meal.amount / 100);
                                }
                            }
                        }
                    }
                });
            }
        }
        this.setMjTotalNutrition(mj);
    }

    public setMjRemainingNutrition(mj: MealJournal): void {
        // Percentage calculations
        for (let nutrientGroup in mj.requiredNutrition) {
            let nutrients = mj.requiredNutrition[nutrientGroup];
            if (nutrientGroup === 'energy') {
                if (nutrients > 0) {
                    mj.remainingNutrition[nutrientGroup] = (mj.totalNutrition[nutrientGroup] / nutrients) * 100;
                } else {
                    mj.remainingNutrition[nutrientGroup] = (mj.totalNutrition[nutrientGroup] === 0) ? 100 : 100 + mj.totalNutrition[nutrientGroup];
                }
            }
            for (let nutrient in nutrients) {
                let mjRNutrient = mj.remainingNutrition[nutrientGroup][nutrient],
                    mjTNutrient = mj.totalNutrition[nutrientGroup][nutrient];
                if (nutrients[nutrient] > 0) {
                    mjRNutrient = (mjTNutrient / nutrients[nutrient]) * 100;
                } else {
                    mjRNutrient = (mjTNutrient === 0) ? 100 : 100 + mjTNutrient;
                }
            }
        }
    }

    public setMjTotalNutrition(mj: MealJournal): void {
        mj.totalNutrition = new Nutrition();
        for (let nutrientGroup in mj.totalNutrition) {
            if (nutrientGroup === 'energy') {
                mj.totalNutrition[nutrientGroup] += mj.breakfast.total[nutrientGroup] +
                    mj.brunch.total[nutrientGroup] +
                    mj.lunch.total[nutrientGroup] +
                    mj.snack.total[nutrientGroup] +
                    mj.dinner.total[nutrientGroup];
            }
            // Set total intake for each nutrient in the nutrient groups
            for (let nutrient in mj.totalNutrition[nutrientGroup]) {
                mj.totalNutrition[nutrientGroup][nutrient] += mj.breakfast.total[nutrientGroup][nutrient] +
                    mj.brunch.total[nutrientGroup][nutrient] +
                    mj.lunch.total[nutrientGroup][nutrient] +
                    mj.snack.total[nutrientGroup][nutrient] +
                    mj.dinner.total[nutrientGroup][nutrient];
            }
        }
    }

    public removeMealJournal(mj: MealJournal): void {
        this.mealJournals.remove(mj['$key']);
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
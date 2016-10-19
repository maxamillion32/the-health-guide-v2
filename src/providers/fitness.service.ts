import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';

import { Fitness } from "../models";

@Injectable()
export class FitnessService {
  public userFitness: FirebaseObjectObservable<Fitness>;
  constructor(private af: AngularFire, private auth: FirebaseAuth) {
    auth.subscribe(authData => {
      if (!!authData) {
        this.userFitness = af.database.object(`/fitness/${authData.uid}`);
      }
    });
  }

  private setBMR(userFitness: Fitness): void {
    if (userFitness.gender === 'male') {
      userFitness.bmr = Math.floor(13.397 * userFitness.weight + 4.799 * userFitness.height - 5.677 * userFitness.age + 88.362);
    } else {
      userFitness.bmr = Math.floor(9.247 * userFitness.weight + 3.098 * userFitness.height - 4.33 * userFitness.age + 447.593);
    }
  };

  private setBMI(userFitness: Fitness): void {
    userFitness.bmi.data = +(10000 * userFitness.weight / Math.pow(userFitness.height, 2)).toFixed(2);
    if (userFitness.bmi.data > 25 || userFitness.bmi.data < 18) {
      userFitness.bmi.normal = false;
    } else {
      userFitness.bmi.normal = true;
    }
  }

  private setBodyFatFemale(userFitness: Fitness): void {
    let bodyFatWeight: number = 0, leanBodyMass: number = 0;
    leanBodyMass = ((userFitness.weight * 2.205) * 0.732) + 8.987 +
      (userFitness.wrist * 0.394 / 3.14) -
      (userFitness.waist * 0.394 * 0.157) -
      (userFitness.hips * 0.394 * 0.249) +
      (userFitness.forearm * 0.434);
    bodyFatWeight = (userFitness.weight * 2.205) - leanBodyMass;
    userFitness.fatPercentage.data = +((bodyFatWeight * 100) / (userFitness.weight * 2.205)).toFixed(2);
    if (userFitness.fatPercentage.data < 0) {
      userFitness.fatPercentage.data = 0
    }
    if (userFitness.fatPercentage.data > 25 || userFitness.fatPercentage.data < 10) {
      userFitness.fatPercentage.normal = false;
    } else {
      userFitness.fatPercentage.normal = true;
    }
  }

  private setBodyFatMale(userFitness: Fitness): void {
    let bodyFatWeight: number = 0, leanBodyMass: number = 0;
    leanBodyMass = (userFitness.weight * 2.205 * 1.082) + 94.42 - (userFitness.waist * 0.394 * 4.15);
    bodyFatWeight = (userFitness.weight * 2.205) - leanBodyMass;
    userFitness.fatPercentage.data = +((bodyFatWeight * 100) / (userFitness.weight * 2.205)).toFixed(2);
    if (userFitness.fatPercentage.data > 20 || userFitness.fatPercentage.data < 2) {
      userFitness.fatPercentage.normal = false;
    } else {
      userFitness.fatPercentage.normal = true;
    }
  };

  private setFitness(userFitness: Fitness): void {
    this.setBMR(userFitness);
    this.setBMI(userFitness);
    if (userFitness.gender === 'male') {
      this.setBodyFatFemale(userFitness);
    } else {
      this.setBodyFatMale(userFitness);
    }
  }

  public getFitness(): Observable<any> {
    return new Observable(observer => {
      this.userFitness.subscribe(fitness => {
        if (!fitness.hasOwnProperty('$value')) {
          observer.next(fitness);
        }
      });
    });
  }

  public updateFitness(userFitness: Fitness): void {
    console.log(userFitness);
    this.setFitness(userFitness);
    if (userFitness.hasOwnProperty('$key')) {
      delete userFitness['$key'];
      this.userFitness.update(userFitness);
    } else {
      this.userFitness.set(userFitness);
    }
  }

}

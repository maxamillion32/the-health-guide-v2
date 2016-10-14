import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Bio } from "../models";

@Injectable()
export class FitnessService {

  constructor() {}

  private setBMR(userBio: Bio): void {
    if (userBio.gender === 'male') {
      userBio.bmr = Math.floor(13.397 * userBio.weight + 4.799 * userBio.height - 5.677 * userBio.age + 88.362);
    } else {
      userBio.bmr = Math.floor(9.247 * userBio.weight + 3.098 * userBio.height - 4.33 * userBio.age + 447.593);
    }
  };

  private setBMI(userBio: Bio): void {
    userBio.bmi.data = +(10000 * userBio.weight / Math.pow(userBio.height, 2)).toFixed(2);
    if (userBio.bmi.data > 25 || userBio.bmi.data < 18) {
      userBio.bmi.normal = false;
    } else {
      userBio.bmi.normal = true;
    }
  }

  private setBodyFatFemale(userBio: bio): void {
    let bodyFatWeight: number = 0, leanBodyMass: number = 0;
    leanBodyMass = ((userBio.weight * 2.205) * 0.732) + 8.987 +
      (userBio.wrist * 0.394 / 3.14) -
      (userBio.waist * 0.394 * 0.157) -
      (userBio.hips * 0.394 * 0.249) +
      (userBio.forearm * 0.434);
    bodyFatWeight = (userBio.weight * 2.205) - leanBodyMass;
    userBio.fatPercentage.data = +((bodyFatWeight * 100) / (userBio.weight * 2.205)).toFixed(2);
    if (userBio.fatPercentage.data < 0) {
      userBio.fatPercentage.data = 0
    }
    if (userBio.fatPercentage.data > 25 || userBio.fatPercentage.data < 10) {
      userBio.fatPercentage.normal = false;
    } else {
      userBio.fatPercentage.normal = true;
    }
  }

  private setBodyFatMale(userBio: Bio): void {
    let bodyFatWeight: number = 0, leanBodyMass: number = 0;
    leanBodyMass = (userBio.weight * 2.205 * 1.082) + 94.42 - (userBio.waist * 0.394 * 4.15);
    bodyFatWeight = (userBio.weight * 2.205) - leanBodyMass;
    userBio.fatPercentage.data = +((bodyFatWeight * 100) / (userBio.weight * 2.205)).toFixed(2);
    if (userBio.fatPercentage.data > 20 || userBio.fatPercentage.data < 2) {
      userBio.fatPercentage.normal = false;
    } else {
      userBio.fatPercentage.normal = true;
    }
  };

  public setFitness(userBio: Bio): void {
    this.setBMR(userBio);
    this.setBMI(userBio);
    if (userBio.gender === 'male') {
      this.setBodyFatFemale(userBio);
    } else {
      this.setBodyFatMale(userBio);
    }
  }

}

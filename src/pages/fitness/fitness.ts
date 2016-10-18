import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';

//Model
import { Bio } from '../../models';

// Providers
import { FitnessService } from '../../providers';

@Component({
  templateUrl: 'fitness.html'
})
export class FitnessPage implements OnInit, AfterViewInit {
  @ViewChild('fitnessForm') fitnessForm;
  public userBio: Bio = new Bio();
  constructor(private fitnessSvc: FitnessService) { }

  public updateBio(): void {
    this.fitnessSvc.updateBio(this.userBio);
  }

  ngOnInit(): void {
    this.fitnessSvc.getBio().subscribe(bio => {
      if (!!bio) {
        this.userBio = bio;
      }
    });
  }

  ngAfterViewInit(): void {
    Observable.combineLatest(
      this.fitnessForm.statusChanges,
      this.fitnessForm.valueChanges,
      (status, value) => ({ status, value })
    ).filter(({status}) => status === 'VALID').subscribe(({value}) => {
      if (this.fitnessForm.dirty) {
        this.updateBio();
      }
    });
  }

}

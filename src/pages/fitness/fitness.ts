import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';

//Model
import { Fitness } from '../../models';

// Providers
import { FitnessService } from '../../providers';

@Component({
  templateUrl: 'fitness.html'
})
export class FitnessPage implements OnInit, AfterViewInit {
  @ViewChild('fitnessForm') fitnessForm;
  public userFitness: Fitness = new Fitness();
  constructor(private fitnessSvc: FitnessService) { }

  public updateFitness(): void {
    this.fitnessSvc.updateFitness(this.userFitness);
  }

  ngOnInit(): void {
    this.fitnessSvc.getFitness().subscribe(fitness => {
      if (!!fitness) {
        this.userFitness = fitness;
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
        this.updateFitness();
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { MealJournal } from '../../../../models';

@Component({
    templateUrl: 'mj-details.html'
})
export class MjDetailsPage implements OnInit {
    public mealJournal: MealJournal;
    constructor(private params: NavParams) { }

    ngOnInit(): void { 
        this.mealJournal = this.params.get('mealJournal');
     }
}
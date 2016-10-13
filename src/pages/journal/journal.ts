import { Component, OnInit } from '@angular/core';

// Pages
import { ActivityJournal } from './activity-journal/activity-journal';
import { MealJournal } from './meal-journal/meal-journal';

@Component({
    template:
        `<ion-tabs>
	        <ion-tab tabIcon="star" [root]="mjTab"></ion-tab>
            <ion-tab tabIcon="bicycle" [root]="ajTab"></ion-tab>
        </ion-tabs>`
})
export class Journal implements OnInit {
    public ajTab: any;
    public mjTab: any;
    constructor() { }

    ngOnInit(): void {
        this.ajTab = ActivityJournal;
        this.mjTab = MealJournal;
    }
}
import { Component, OnInit } from '@angular/core';

// Pages
import { ActivityJournalPage } from './activity-journal/activity-journal';
import { MealJournalPage } from './meal-journal/meal-journal';

@Component({
    template:
        `<ion-tabs>
	        <ion-tab tabIcon="nutrition" [root]="mjTab"></ion-tab>
            <ion-tab tabIcon="bicycle" [root]="ajTab"></ion-tab>
        </ion-tabs>`
})
export class JournalPage implements OnInit {
    public ajTab: any;
    public mjTab: any;
    constructor() { }

    ngOnInit(): void {
        this.ajTab = ActivityJournalPage;
        this.mjTab = MealJournalPage;
    }
}
import { Component, OnInit } from '@angular/core';
import { AngularFire } from "angularfire2";
import { Chart } from 'ng2-chartjs2';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'home.html'
})
export class Home implements OnInit {
  labels: string[] = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
  data: Chart.Dataset[] = [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ];
  constructor(private navCtrl: NavController, public af: AngularFire) { }

  ngOnInit(): void {
    console.log("Welcome home");
  }
}

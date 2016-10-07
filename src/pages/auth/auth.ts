import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

// Pages
import { Home } from "../home/home";

@Component({
  templateUrl: 'auth.html'
})
export class Auth implements OnInit {
  public usrEmail: string;
  public usrPassword: string;

  constructor(private alertCtrl: AlertController, private loadCtrl: LoadingController, private navCtrl: NavController, public af: AngularFire) { }

  private showError(message: any) {
    let alert = this.alertCtrl.create({
      title: 'Log in failed!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public fbLogin(): void {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(authData => {
      this.navCtrl.setRoot(Home);
    }).catch(error => {
      loader.dismiss();
      this.showError(error);
    });
  }

  public githubLogin(): void {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup
    }).then(authData => {
      this.navCtrl.setRoot(Home);
    }).catch(error => {
      loader.dismiss();
      this.showError(error);
    });
  }

  public googleLogin(): void {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(authData => {
      this.navCtrl.setRoot(Home);
    }).catch(error => {
      loader.dismiss();
      this.showError(error);
    });
  }

  public passLogin(usrCredentials: any): void {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    this.af.auth.login(usrCredentials).then(authData => {
      this.navCtrl.setRoot(Home);
    }).catch(error => {
      loader.dismiss();
      this.showError(error);
    });
  }

  public twitterLogin(): void {
    let loader = this.loadCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then(authData => {
      this.navCtrl.setRoot(Home);
    }).catch(error => {
      loader.dismiss();
      this.showError(error);
    });
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth.uid) {
        this.navCtrl.setRoot(Home);
      }
    });
  }

}

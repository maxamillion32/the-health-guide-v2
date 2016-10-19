import { Component, AfterViewInit } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

// Pages
import { HomePage } from "../home/home";

@Component({
  templateUrl: 'auth.html'
})
export class AuthPage implements AfterViewInit {
  public userEmail: string;
  public userPassword: string;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private params: NavParams,
    public af: AngularFire) { }

  private showError(message: any) {
    let alert = this.alertCtrl.create({
      title: 'Log in failed!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public fbLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public githubLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public googleLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public passLogin(userCredentials: any): void {
    this.af.auth.login(userCredentials).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public twitterLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  ngAfterViewInit() {
    if (!this.params.get('logout')) {
      this.af.auth.subscribe(auth => {
        if (!!auth && auth.hasOwnProperty('uid')) {
          setTimeout(() => this.navCtrl.setRoot(HomePage), 1000);
        }
      });
    }
  }

}

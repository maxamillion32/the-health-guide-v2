import { Component, AfterViewInit } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

// Pages
import { Home } from "../home/home";

@Component({
  templateUrl: 'auth.html'
})
export class Auth implements AfterViewInit {
  public usrEmail: string;
  public usrPassword: string;

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
      setTimeout(() => this.navCtrl.setRoot(Home), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public githubLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(Home), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public googleLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(Home), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public passLogin(usrCredentials: any): void {
    this.af.auth.login(usrCredentials).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(Home), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  public twitterLogin(): void {
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Redirect
    }).then(authData => {
      setTimeout(() => this.navCtrl.setRoot(Home), 1000);
    }).catch(error => {
      this.showError(error);
    });
  }

  ngAfterViewInit() {
    if (!this.params.get('logout')) {
      this.af.auth.subscribe(auth => {
        if (auth && auth.uid) {
          setTimeout(() => this.navCtrl.setRoot(Home), 1000);
        }
      });
    }
  }

}

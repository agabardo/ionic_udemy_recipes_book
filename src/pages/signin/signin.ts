import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alrtCtrlr: AlertController,
    private authSrvc: AuthService,
    public navParams: NavParams
    ) {
  }

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content:'Authenticating, please wait'
    });
    loading.present();
    this.authSrvc.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
        console.log(data);
      })
      .catch(error => {
        const myAlert = this.alrtCtrlr.create({
          title:"Not possible to log in",
          message:error.message,
          buttons:['OK']
        });
      })
  }

}

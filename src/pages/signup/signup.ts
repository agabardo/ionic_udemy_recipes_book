import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private authSrvc:AuthService) {
  }

  onSignup(form:NgForm){
    const loading = this.loadingCtrl.create({
      content : "Signing up..."
    });
    loading.present();
    this.authSrvc.signup(form.value.email,form.value.password).then((data)=>{
      loading.dismiss();
      console.log(data);
    }).catch((error)=>{
      console.log(error);
      const myAlert = this.alertCtrl.create({
        title:"Error when creating the user",
        message: error.message,
        buttons: ['OK']
      });
      loading.dismiss();
      myAlert.present();
    });
  }

}

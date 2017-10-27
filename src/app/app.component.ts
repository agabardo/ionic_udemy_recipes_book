import {Component, ViewChild} from '@angular/core';
import { MenuController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {RecipesPage} from "../pages/recipes/recipes";

import firebase from 'firebase';
import {assign} from "rxjs/util/assign";
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  tabsPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  recipesPage:any = RecipesPage;
  isAuthenticated = false;

  @ViewChild('nav') nav : NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl:MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyAufZuQPgXf3EPjF63jSA7c_VklmrOTPqM",
      authDomain: "recipesbook-udemy.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      }
      else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut(){
    this.authService.signout();
    this.menuCtrl.close();
  }

}



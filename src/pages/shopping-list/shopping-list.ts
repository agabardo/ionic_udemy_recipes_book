import { Component } from '@angular/core';
import { NgForm} from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {ActionSheetController, PopoverController} from "ionic-angular";
import {SLOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  items:Ingredient[];

  constructor(private slService:ShoppingListService, private actionSheetController:ActionSheetController, private popOverCtrlr: PopoverController, private authSrvc: AuthService){

  }

  onAddItem(form:NgForm){
    this.slService.addItem(form.value.ingridientName,form.value.ingridientAmount);
    this.items = this.slService.getItems();
    form.reset();
  }

  removeItem(index:number){
    this.slService.removeItem(index);
    this.items = this.slService.getItems();
  }

  ionViewWillEnter(){ //To be used when there is dynamic data to show.
    this.items = this.slService.getItems();
  }

  onShowOptions(event:MouseEvent){
    const popMeOver = this.popOverCtrlr.create(SLOptionsPage);
    popMeOver.present({ev:event});
    popMeOver.onDidDismiss(data => {
      if(data.action == "load"){
        this.loadItems();
      }
      else{
        this.authSrvc.getActiveUser().getToken().then((token:string) => {

        }).catch(error => {

        });
      }
    })
  }

  private loadItems(){
    this.items = this.slService.getItems();
  }

}

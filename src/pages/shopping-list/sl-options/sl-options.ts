import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-sl-options',
  template: `
  <ion-grid text-center>
    <ion-row>
      <ion-col>
        <h3>Store and Load</h3>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button (click)="onAction('load')" >Load list</button>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <button ion-button (click)="onAction('store')" >Save list</button>
      </ion-col>
    </ion-row>
  </ion-grid>
  `
})
export class SLOptionsPage{
  constructor(private viewCtrlr:ViewController){

  }

  onAction(action:string){
    this.viewCtrlr.dismiss({action:action})
  }
}

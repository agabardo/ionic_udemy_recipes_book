import { Component, OnInit } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetController:ActionSheetController) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }


  onManageIngridients(){
    const actionSheet = this.actionSheetController.create({
      title:"What do you want to do?",
      buttons:[{
        text:'Add ingridient',
        handler: () => {

        }
      },
        {
          text:'Remove all ingridients',
          role:'destructive',
          handler: () => {

          }
      },
        {
          text:"Cancel",
          role:"cancel"
        }
      ],
    });
    actionSheet.present();
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

  initializeForm(){
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'dificulty': new FormControl('Medium', Validators.required),
    });
  }

}

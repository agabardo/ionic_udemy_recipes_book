import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionSheetController:ActionSheetController,
    private  alertCtrlr:AlertController,
  ) {
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
          this.createNewIngredient().present();
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


  private createNewIngredient(){
    return this.alertCtrlr.create({
      title:"Add ingredient",
      inputs:[
        {
          name:'name',
          placeholder:"Name"
        }
      ],
      buttons:[
        {
          text:"Add",
          handler: data => {
            if(data.name.trim == "" || data.name == null){
              return;
            }

            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
          }
        }
      ]
    });
  }


  onSubmit(){
    console.log(this.recipeForm);
  }

  initializeForm(){
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'dificulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([]),
    });
  }

}

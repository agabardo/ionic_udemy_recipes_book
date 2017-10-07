import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";

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
    private tostCtrlr:ToastController,
    private recipeSrvc:RecipesService,
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
            const fArray:FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len  = fArray.length;
            if(len > 0){
              for(let i = len - 1; i >= 0; i--){
                fArray.removeAt(i);
              }

              const mtoast = this.tostCtrlr.create({
                message:"Ingredients removed",
                position:'bottom',
                duration:1500,
                showCloseButton:true,
              });
              mtoast.present();
            }
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
            if(data.name.trim() == '' || data.name == null){
              const mtoast = this.tostCtrlr.create({
                message:"Can not be empty",
                position:'bottom',
                duration:1500,
                showCloseButton:true,
              });
              mtoast.present();
              return;
            }
            else{
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
              const mtoast = this.tostCtrlr.create({
                message: data.name + " added",
                position:'bottom',
                duration:1500,
                showCloseButton:true,
              });
              mtoast.present();
            }
          }
        }
      ]
    });
  }


  onSubmit(){
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount:1};
      });
    }
    this.recipeSrvc.addRecipe(value.title,value.description,value.dificulty,value.ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
    console.log(this.recipeSrvc.getRecipes());
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

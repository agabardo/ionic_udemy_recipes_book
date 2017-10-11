import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{

  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe:Recipe;
  index:number;

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
    if(this.mode == "Edit"){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
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

    if(this.mode=="Edit"){
      this.recipeSrvc.updateRecipe(this.index, value.title, value.description, value.dificulty, ingredients);
    }
    else {
      this.recipeSrvc.addRecipe(value.title, value.description, value.dificulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
    console.log(this.recipeSrvc.getRecipes());
  }

  initializeForm(){

    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == "Edit"){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients),
    });
  }

}

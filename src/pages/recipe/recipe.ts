import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list";
import {RecipesService} from "../../services/recipes";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService:ShoppingListService,
    private recipeService:RecipesService) {
  }

  ngOnInit(){
    this.index = this.navParams.get('index');
    this.recipe = this.navParams.get('recipe');
  }

  editRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:"Edit",recipe:this.recipe,index:this.index});
  }

  addIngredients(){
    this.shoppingListService.addItems(this.recipe.ingredients);
  }

  deleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
